import { deleteUser } from "../../services";
import { UserResponse } from "../../types";

interface UsersListProps {
  users: UserResponse[];
  fetchUsers: () => Promise<void>;
}

export const UsersList = ({ users, fetchUsers }: UsersListProps) => {
  //
  const handleDeleteUser = async (id: string) => {
    const success = await deleteUser(id);
    if (!success) {
      alert("No se pudo eliminar el usuario");
    } else {
      fetchUsers();
      alert("Usuario eliminado: " + id);
    }
  };

  return (
    <div className="UsersList flex flex-col gap-2.5">
      <h2 className="text-xl font-semibold text-red-500">
        Usuarios actuales: <b>{users.length}</b>
      </h2>
      <UserCardHeader />
      <div className="flex flex-col gap-1.5 max-h-[70vh] overflow-y-auto">
        {users.length === 0 ? (
          <span className="text-gray-600 font-semibold text-lg border rounded-md bg-gray-50 border-gray-300 py-2 px-4">
            No hay usuarios registrados en el sistema
          </span>
        ) : (
          users
            .sort((a, b) => a.role.localeCompare(b.role))
            .map((user) => (
              <UserCard
                key={user.email}
                user={user}
                handleDeleteUser={handleDeleteUser}
                isHeader={false}
              />
            ))
        )}
      </div>
    </div>
  );
};

const UserCard = ({
  user = null,
  handleDeleteUser = () => {},
  isHeader = false,
}: {
  user: UserResponse | null;
  handleDeleteUser: (id: string) => void;
  isHeader: boolean;
}) => {
  return (
    <div
      className={`py-2 px-4 border rounded-md flex justify-between gap-5 ${
        !isHeader ? "bg-gray-50 border-gray-300" : "bg-gray-200"
      }`}
    >
      <span title={user?.email} className="overflow-hidden truncate flex gap-5">
        <span className="w-36 overflow-hidden truncate font-semibold">
          {!isHeader ? user?.name : "Nombre"}
        </span>
        <span className="w-32 overflow-hidden truncate font-bold">
          {!isHeader ? user?.role : "Rol"}
        </span>
        <span className="w-56 overflow-hidden truncate font-semibold">
          {!isHeader ? user?.email : "Email"}
        </span>
      </span>
      <span className="w-10">
        <button
          onClick={() => {
            if (user) {
              handleDeleteUser(user.id);
            }
          }}
          className="cursor-pointer"
        >
          {!isHeader ? "❌" : ""}
        </button>
      </span>
    </div>
  );
};

const UserCardHeader = () => {
  return <UserCard isHeader={true} user={null} handleDeleteUser={() => {}} />;
};
