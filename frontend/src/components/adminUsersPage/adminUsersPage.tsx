import { useEffect, useState } from "react";
import { UserForm, UsersList } from "../";
import { getUsers } from "../../services";
import { UserResponse } from "../../types/user/user.interfaces";

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
    <div className="AdminUsersPage pl-10 pt-4">
      <div className="flex gap-8">
        <div className="w-1/3">
          <UserForm fetchUsers={fetchUsers} />
        </div>
        <UsersList users={users} fetchUsers={fetchUsers} />
      </div>
    </div>
  );
};
