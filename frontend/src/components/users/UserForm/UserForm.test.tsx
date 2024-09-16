import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import { expect, it, vi } from "vitest";

import { userEvent } from "@testing-library/user-event";
import { errorMessages } from "@/utils/messages/error.messages";
import { UserForm } from "./UserForm";
import { UserRole } from "@/types/user/user.interfaces";

const {
  email: { invalid: emailInvalid },
  password: { tooShort: passwordTooShort, tooLong: passwordTooLong },
} = errorMessages.userForm;

const userRolesArray = [
  "DEVELOPER",
  "SUPER_ADMIN",
  "ADMIN",
  "USER",
] as UserRole[];

describe("form in creation mode", () => {
  //
  const renderComponent = () => {
    const onSubmit = vi.fn();
    const reset = vi.fn();

    render(<UserForm onSubmit={onSubmit} userRolesArray={userRolesArray} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const nameInput = screen.getByLabelText("Name");
    const roleInput = screen.getByLabelText("Role");
    const submitButton = screen.getByRole("button", { name: "Registrar" });

    const user = userEvent.setup();

    return {
      emailInput,
      passwordInput,
      nameInput,
      roleInput,
      submitButton,
      onSubmit,
      user,
      reset,
    };
  };

  it("should render UserForm successfully", async () => {
    renderComponent();

    expect(screen.getAllByText(userRolesArray[0])).toHaveLength(2);

    userRolesArray.slice(1, userRolesArray.length - 1).forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });

    screen.debug();
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

    expect(onSubmit).toHaveBeenCalledWith(
      {
        email: "test@test.com",
        password: "012345",
        name: "",
        role: "DEVELOPER",
      },
      expect.any(Function)
    );

    screen.debug();
  });
});
