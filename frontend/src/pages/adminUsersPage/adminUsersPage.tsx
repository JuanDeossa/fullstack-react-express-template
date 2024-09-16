import { useEffect, useState } from "react";
import { createUser, getUsers } from "../../services";
import { CreateUser, UserResponse } from "../../types/user/user.interfaces";
import { Toaster } from "sonner";
import { UsersList, CreateUserModal } from "@/components";
import { throwErrorAlert, throwSuccessAlert } from "@/utils/alerts";
import { useRoles } from "@/hooks";

export const AdminUsersPage = () => {
  //
  const userRolesArray = useRoles();

  const [users, setUsers] = useState<UserResponse[]>([]);

  const fetchUsers = async () => {
    const usersResponse = await getUsers();
    if (!usersResponse) return;
    setUsers(usersResponse);
  };

  const handleCreateUser = async (formData: CreateUser, reset: () => void) => {
    const { email, password, name, role } = formData;

    const user = await createUser({
      email: email,
      password: password,
      name: name,
      role: role,
    });

    if (!user) {
      throwErrorAlert("No se pudo crear el usuario");
    } else {
      fetchUsers();
      throwSuccessAlert("Usuario creado: " + user.email);
      reset();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="AdminUsersPage px-10 pt-4">
        <div className="flex flex-col gap-3 items-center max-w-4xl mx-auto mt-5">
          {/* Table Header */}
          <div className="flex justify-between w-full">
            {/* users indicator */}
            <h2 className="text-xl font-semibold text-red-500">
              Usuarios actuales: <b>{users.length}</b>
            </h2>

            <CreateUserModal
              handleCreateUser={(data, reset) => handleCreateUser(data, reset)}
              userRolesArray={userRolesArray}
            />
          </div>

          <UsersList users={users} fetchUsers={fetchUsers} />
        </div>
      </div>
      {/* Alert */}
      <Toaster />
    </>
  );
};
