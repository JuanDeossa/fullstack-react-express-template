import { useEffect, useState } from "react";
import { UserForm, UsersList } from "../";
import { getUsers } from "../../services";
import { UserResponse } from "../../types/user/user.interfaces";
import { createManyUsers, deleteAllUsers } from "../../../devtools";

export const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const fetchUsers = async () => {
    const usersResponse = await getUsers();
    if (!usersResponse) return;
    setUsers(usersResponse);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="AdminUsersPage min-h-screen bg-indigo-50 pt-10 pl-10">
      <div className="flex gap-8">
        <div className="w-1/3">
          <UserForm fetchUsers={fetchUsers} />
          <div className="flex gap-10">
            <button
              type="button"
              className="border border-gray-400 rounded-md bg-gray-400 p-1 font-semibold mt-2"
              onClick={() => {
                createManyUsers(10, fetchUsers);
              }}
            >
              Registrar 10
            </button>
            <button
              type="button"
              className="border border-gray-400 rounded-md bg-red-400 p-1 font-semibold mt-2"
              onClick={() => {
                deleteAllUsers(
                  users
                    .filter(
                      (user) =>
                        !["DEVELOPER", "SUPER_ADMIN"].includes(user.role)
                    )
                    .map((user) => user.id),
                  fetchUsers
                );
              }}
            >
              Eliminar todos
            </button>
          </div>
        </div>
        <UsersList users={users} fetchUsers={fetchUsers} />
      </div>
    </div>
  );
};
