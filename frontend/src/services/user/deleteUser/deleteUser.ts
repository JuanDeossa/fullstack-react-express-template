import { usersUrl } from "../../../api/paths";
import { privateAxios } from "../../../api/axios";

export const deleteUser = async (id: string) => {
  //
  try {
    //
    const { status } = await privateAxios.delete(`${usersUrl}/${id}`);

    if (status !== 204) return null;
    return true;
  } catch (error) {
    //
    console.error(error);
    return null;
  }
};
