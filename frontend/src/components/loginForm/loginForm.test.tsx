import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { expect, it, vi } from "vitest";

import { userEvent } from "@testing-library/user-event";
import { errorMessages } from "@/utils/messages/error.messages";
import { LoginForm } from "./loginForm";

const {
  email: { invalid: emailInvalid },
  password: { tooShort: passwordTooShort, tooLong: passwordTooLong },
} = errorMessages.loginForm;

describe("form", () => {
  //
  const renderComponent = () => {
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Ingresar" });

    const user = userEvent.setup();

    return { emailInput, passwordInput, submitButton, onSubmit, user };
  };

  it("should render LoginForm successfully", async () => {
    renderComponent();
  });

  it("should validate email successfully", async () => {
    const { emailInput, submitButton, onSubmit, user } = renderComponent();

    await user.type(emailInput, "test.com");
    await user.click(submitButton);

    expect(screen.getByText(emailInvalid)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.clear(emailInput);
    await user.type(emailInput, "test@testcom");
    await user.click(submitButton);

    expect(screen.getByText(emailInvalid)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.clear(emailInput);
    await user.type(emailInput, "test@test.");
    await user.click(submitButton);

    expect(screen.getByText(emailInvalid)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.clear(emailInput);
    await user.type(emailInput, "test@test.com");
    await user.click(submitButton);

    expect(screen.queryByText(emailInvalid)).not.toBeInTheDocument();
  });

  it("should validate password successfully", async () => {
    const { passwordInput, submitButton, onSubmit, user } = renderComponent();

    await user.type(passwordInput, "01234");
    await user.click(submitButton);

    expect(screen.getByText(passwordTooShort)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.clear(passwordInput);
    await user.type(passwordInput, "0123456789101");
    await user.click(submitButton);

    expect(screen.getByText(passwordTooLong)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();

    await user.clear(passwordInput);
    await user.type(passwordInput, "012345");
    await user.click(submitButton);

    expect(screen.queryByText(passwordTooShort)).not.toBeInTheDocument();
    expect(screen.queryByText(passwordTooLong)).not.toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should submit successfully", async () => {
    const { emailInput, passwordInput, submitButton, onSubmit, user } =
      renderComponent();

    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "012345");
    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledOnce();

    screen.debug();
  });
});
