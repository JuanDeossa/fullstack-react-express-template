import { deleteUser } from "../src/services";

export const deleteAllUsers = async (
  userIds: string[] = [],
  fetchUsers = async () => {}
) => {
  //
  for (const id of userIds) {
    await deleteUser(id);
  }

  fetchUsers();
};
