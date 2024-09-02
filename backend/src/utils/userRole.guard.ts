import { CustomError } from "./errorHandler";

export const userRoleGuard = (subRole: string, reqRole: string) => {
  //
  const throwForbiddenError = () => {
    throw new CustomError("Unauthorized role", 403, "UNAUTHORIZED_ROLE");
  };

  switch (subRole) {
    case "DEVELOPER":
      if (["DEVELOPER"].includes(reqRole)) {
        throwForbiddenError();
      }
      break;

    case "SUPER_ADMIN":
      if (["DEVELOPER", "SUPER_ADMIN"].includes(reqRole)) {
        throwForbiddenError();
      }
      break;

    case "ADMIN":
      if (["DEVELOPER", "SUPER_ADMIN", "ADMIN"].includes(reqRole)) {
        throwForbiddenError();
      }
      break;

    case "ADMIN":
      if (["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"].includes(reqRole)) {
        throwForbiddenError();
      }
      break;

    default:
      break;
  }
};
