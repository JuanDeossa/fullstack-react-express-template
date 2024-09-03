import { useEffect, useState } from "react";
import { UserForm, UsersList } from "@/components";
import { getUsers } from "../../services";
import { UserResponse } from "../../types/user/user.interfaces";
import { createManyUsers, deleteAllUsers } from "../../../devtools";
import { envs } from "../../config/envs";
import { Toaster } from "sonner";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const [isLoading, setIsLoading] = useState({
    create: false,
    delete: false,
  });

  const someIsLoading = Object.values(isLoading).some(
    (isLoading) => !!isLoading
  );

  const handleStartLoading = (type: "create" | "delete") => {
    setIsLoading({ ...isLoading, [type]: true });
  };

  const handleFinishLoading = (type: "create" | "delete") => {
    setIsLoading({ ...isLoading, [type]: false });
  };

  const fetchUsers = async () => {
    const usersResponse = await getUsers();
    if (!usersResponse) return;
    setUsers(usersResponse);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createLimit = envs.DEVTOOL_CREATE_USERS_RATE_LIMIT;
  const allowDevtools = envs.ALLOW_DEVTOOLS;

  return (
    <div className="AdminUsersPage pl-10 pt-4">
      <div className="flex gap-8">
        <div className="w-1/3">
          <UserForm fetchUsers={fetchUsers} />
          {allowDevtools && (
            <div className="flex gap-10">
              <button
                type="button"
                disabled={someIsLoading}
                className="border border-gray-400 rounded-md bg-gray-400 p-1 font-semibold mt-2 disabled:opacity-75"
                onClick={async () => {
                  handleStartLoading("create");
                  await createManyUsers(createLimit, fetchUsers);
                  handleFinishLoading("create");
                }}
              >
                {!isLoading.create ? `Registrar ${createLimit}` : "Cargando..."}
              </button>
              <button
                type="button"
                disabled={someIsLoading}
                className="border border-gray-400 rounded-md bg-red-400 p-1 font-semibold mt-2 disabled:opacity-75"
                onClick={async () => {
                  handleStartLoading("delete");
                  await deleteAllUsers(
                    users
                      .filter(
                        (user) =>
                          !["DEVELOPER", "SUPER_ADMIN"].includes(user.role)
                      )
                      .map((user) => user.id),
                    fetchUsers
                  );
                  handleFinishLoading("delete");
                }}
              >
                {!isLoading.delete ? "Eliminar todos" : "Cargando..."}
              </button>
            </div>
          )}
        </div>
        <UsersList users={users} fetchUsers={fetchUsers} />
        {/* <Alert /> */}
        <Toaster />
      </div>
    </div>
  );
};
