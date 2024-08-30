import { createUser } from "../src/services";

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
    const { status } = await createUser({
      name: email.split("@")[0],
      email: email,
      password: "123456",
    });
    if (status === 201) {
      console.log(`User created: ${email}`);
    } else {
      console.log(`User not created: ${email}`);
    }
  }

  fetchUsers();
};
