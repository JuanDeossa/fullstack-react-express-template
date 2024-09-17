import { UserRole } from "@/types/user/user.interfaces";

export const userRolesFormat = (role: UserRole | string) => {
  try {
    switch (role) {
      case "DEVELOPER":
        return "Desarrollador";
      case "SUPER_ADMIN":
        return "Super Administrador";
      case "ADMIN":
        return "Administrador";
      case "USER":
        return "Usuario";
      default:
        return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};
