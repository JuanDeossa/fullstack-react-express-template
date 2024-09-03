import { CreateUserType } from "./users.schemas";
import { Role } from "./user.interfaces";
import { CustomError } from "../../utils/errorHandler";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
} from "./users.repository";
import bcrypt from "bcrypt";
import { User } from "./user.interfaces";
import { userRoleGuard } from "../../utils/userRole.guard";

export const createUserService = async (
  userData: CreateUserType,
  subRole: string
): Promise<User> => {
  try {
    // Return early if sub role is not allowed to create a user role
    userRoleGuard(subRole, userData.role);

    // Hash de la contraseña
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await createUser({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role,
    });

    return user;
    //
  } catch (error: any) {
    //
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};

export const getUsersService = async (subRole: Role): Promise<User[]> => {
  try {
    //
    const dbUsers = await getUsers();

    let users: User[] = [];

    switch (subRole) {
      case "DEVELOPER":
        users = dbUsers.filter((user) => !["DEVELOPER"].includes(user.role));
        break;
      case "SUPER_ADMIN":
        users = dbUsers.filter(
          (user) => !["DEVELOPER", "SUPER_ADMIN"].includes(user.role)
        );
        break;
      case "ADMIN":
        users = dbUsers.filter(
          (user) => !["DEVELOPER", "SUPER_ADMIN", "ADMIN"].includes(user.role)
        );
        break;
      case "USER":
        throw new CustomError("Unauthorized role", 403, "UNAUTHORIZED_ROLE");
        break;

      default:
        break;
    }

    return users;
  } catch (error: any) {
    //
    console.error("Error from service", error?.message || error);

    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};

export const deleteUserService = async (
  id: string,
  subRole: string,
  subEmail: string
) => {
  //
  try {
    const user = await getUserById(id);

    // Return early if sub role is not allowed to create a user role
    userRoleGuard(subRole, user.role);

    await deleteUser(id, subEmail);
    return true;
  } catch (error: any) {
    //
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};
