import { DeleteUserModal } from "@/components/common";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  //   TableFooter,
} from "@/components/ui/table";
import { UserResponse } from "@/types";
import { userRolesFormat } from "@/utils";

interface Props {
  users: UserResponse[];
  handleDeleteUser: (id: string) => void;
}

export const UsersTable = ({ users, handleDeleteUser }: Props) => {
  return (
    <Table>
      <TableCaption>Lista de usuarios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[140px]">Nombre</TableHead>
          <TableHead className="w-[160px]">Rol</TableHead>
          <TableHead className="text-center w-[160px]">Activo</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{userRolesFormat(user.role)}</TableCell>
            <TableCell className="text-center">
              {user.is_active ? "✔️" : "✖️"}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <DeleteUserModal
                email={user?.email || ""}
                onConfirm={() => {
                  if (user) {
                    handleDeleteUser(user.id);
                  }
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};
