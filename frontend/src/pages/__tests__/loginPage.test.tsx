import { it, expect, describe, vi, Mock } from "vitest";

import { render, screen } from "@testing-library/react";

import { LoginPage } from "../loginPage/loginPage";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import userEvent from "@testing-library/user-event";
import { loginService } from "@/api/services";
import { paths } from "@/routes/paths";

const mockNavigate = vi.fn();

vi.mock("@/hooks/useNav", () => ({
  useNav: () => ({ navigate: mockNavigate }),
}));

vi.mock("@/components/loginForm/loginForm", () => ({
  LoginForm: ({
    onSubmit,
  }: {
    onSubmit: ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => void;
  }) => (
    <button
      onClick={() => onSubmit({ email: "test@test.com", password: "12345678" })}
    >
      Login
    </button>
  ),
}));

vi.mock("@/components/common/loaders/spinner/spinner", () => ({
  Spinner: () => <span data-testid="spinner">Spinner</span>,
}));

describe("HomePage", () => {
  //
  const renderComponent = () => {
    render(
      <AuthContext.Provider value={{ user: null, setUser: () => {} }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const formButton = screen.getByRole("button", { name: "Login" });
    const spinner = screen.queryByTestId("spinner");

    const user = userEvent.setup();

    return { formButton, spinner, user };
  };

  it("should render successfully", () => {
    const { formButton, spinner } = renderComponent();

    expect(formButton).toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();
  });

  it("should show the spinner when loading", async () => {
    //
    vi.mock("@/api/services/auth/loginService", () => ({
      loginService: vi.fn(() => new Promise(() => {})), // Promesa pendiente
    }));

    // Estado inicial
    const { formButton, user } = renderComponent();

    // Disparamos el evento de submit del formulario
    await user.click(formButton);

    screen.debug();

    // Verificamos que el spinner aparece en el DOM
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();

    // Verificamos que el formulario ya no está presente
    expect(formButton).not.toBeInTheDocument();
  });

  it("should call the login service & navigate to home", async () => {
    //
    (loginService as Mock).mockResolvedValue({
      status: "success",
      message: "Login exitoso",
      data: {
        // Asegúrate de que esta estructura coincide con lo que se espera en el código
        user: {
          id: "1",
          email: "test@test.com",
          name: "Test User",
          role: "user",
        },
        token: "fake_token",
      },
    });

    // Estado inicial
    const { formButton, user } = renderComponent();

    // Disparamos el evento de submit del formulario
    await user.click(formButton);

    screen.debug();

    expect(loginService).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "12345678",
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      path: paths.HOME,
      replace: false,
    });

    // Verificamos que el spinner no aparece en el DOM
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();

    // Verificamos que el formulario ya no está presente en el DOM
    expect(formButton).not.toBeInTheDocument();
  });
});
