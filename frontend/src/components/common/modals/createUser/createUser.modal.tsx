import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components";
import { UserForm } from "@/components/users/UserForm/UserForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CreateUser } from "@/types";
import { UserRole } from "@/types/user/user.interfaces";

interface Props {
  handleCreateUser: (data: CreateUser, reset: () => void) => void;
  userRolesArray: UserRole[];
}

export const CreateUserModal = ({
  handleCreateUser,
  userRolesArray,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Nuevo usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <UserForm onSubmit={handleCreateUser} userRolesArray={userRolesArray} />
      </DialogContent>
    </Dialog>
  );
};
