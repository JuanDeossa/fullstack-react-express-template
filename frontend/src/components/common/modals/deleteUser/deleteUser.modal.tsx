import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IconTrash } from "../../icons";

interface Props {
  email: string;
  onConfirm: () => void;
}

export const DeleteUserModal = ({ email, onConfirm }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="bg-transparent border-none shadow-none hover:bg-transparent"
          data-testid="delete-user-button"
        >
          <IconTrash className="text-red-500 w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿ Estás seguro de eliminar este usuario ? "{email}"
          </AlertDialogTitle>
          <AlertDialogDescription>
            Si eliminas este usuario, no podrás registrar un nuevo usuario con
            el mismo email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
            }}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
