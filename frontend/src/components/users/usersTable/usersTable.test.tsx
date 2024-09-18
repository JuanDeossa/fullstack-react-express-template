import { it, expect, describe, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import { UsersTable } from "./usersTable";
import { UserResponse } from "@/types";
import { userRolesFormat } from "@/utils";
import userEvent from "@testing-library/user-event";

const mockUsers = [
  {
    id: "1",
    name: "juan",
    email: "juan@test2.com",
    role: "DEVELOPER",
    is_active: false,
  },
  {
    id: "2",
    name: "pedro",
    email: "juan@test3.com",
    role: "SUPER_ADMIN",
    is_active: true,
  },
  {
    id: "3",
    name: "paco",
    email: "juan@test1.com",
    role: "ADMIN",
    is_active: false,
  },
  {
    id: "4",
    name: "iker",
    email: "juan@test11.com",
    role: "USER",
    is_active: false,
  },
] as UserResponse[];

const mockDeleteUser = vi.fn();

describe("users table", () => {
  const expectRenderLabels = () => {
    expect(screen.getByRole("table")).toBeInTheDocument();

    expect(screen.getAllByRole("columnheader")).toHaveLength(5);

    expect(screen.getByRole("columnheader", { name: /nombre/i })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /email/i })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /activo/i })).toBeDefined();
    expect(screen.getByRole("columnheader", { name: /rol/i })).toBeDefined();
  };

  it("should render empty users table", () => {
    render(<UsersTable users={[]} handleDeleteUser={mockDeleteUser} />);

    expectRenderLabels();

    // screen.debug();

    expect(screen.getAllByRole("row")).toHaveLength(1 + 0);

    expect(screen.getByText(/No hay usuarios/i)).toBeInTheDocument();
  });

  it("should render a full-filled users table", () => {
    render(<UsersTable users={mockUsers} handleDeleteUser={() => {}} />);

    expectRenderLabels();

    // screen.debug();

    expect(screen.queryByText(/No hay usuarios/i)).not.toBeInTheDocument();

    expect(screen.getAllByRole("row")).toHaveLength(1 + 4);

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(userRolesFormat(user.role))).toBeInTheDocument();
    });

    expect(screen.getAllByText("✖️")).toHaveLength(3);
    expect(screen.getAllByText("✔️")).toHaveLength(1);
  });

  it("should show the delete user confirm modal", async () => {
    render(<UsersTable users={mockUsers} handleDeleteUser={mockDeleteUser} />);

    expectRenderLabels();

    screen.debug();

    const deleteUserButton = screen.getAllByTestId("delete-user-button");

    expect(deleteUserButton).toHaveLength(4);

    const user = userEvent.setup();

    await user.click(deleteUserButton[0]);

    expect(screen.getByText(/eliminar este usuario/i)).toBeInTheDocument();
    expect(screen.getAllByText(/juan@test2.com/i)).toHaveLength(2);

  });
});
