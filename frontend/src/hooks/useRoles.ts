import { UserRole } from "../types/user/user.interfaces";
import { useAuth } from "./useAuth";

export const useRoles = () => {
  //
  const { user } = useAuth();

  if (!user) {
    return [];
  }

  // const roles: UserRole[] = Object.values(UserRole);
  // return roles;
  const roles: UserRole[] = [];

  const { role } = user;

  switch (role) {
    case "DEVELOPER":
      roles.push(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER);
      break;
    case "SUPER_ADMIN":
      roles.push(UserRole.ADMIN, UserRole.USER);
      break;
    case "ADMIN":
      roles.push(UserRole.USER);
      break;
    case "USER":
      break;

    default:
      break;
  }

  return roles;
};
