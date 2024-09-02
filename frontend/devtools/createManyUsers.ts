import { createUser } from "../src/services";
import { UserRole } from "../src/types/user/user.interfaces";

export const createManyUsers = async (
  quantity = 10,
  fetchUsers = async () => {}
) => {
  //
  const userEmails: string[] = [];

  const id = crypto.randomUUID().slice(0, 8);

  for (let i = 0; i < quantity; i++) {
    userEmails.push(`User-${id}-${i + 1}@gmail.com`);
  }

  for (const email of userEmails) {
    await createUser({
      name: email.split("@")[0],
      email: email,
      password: "123456",
      role: UserRole.USER,
    });
  }

  fetchUsers();
};
