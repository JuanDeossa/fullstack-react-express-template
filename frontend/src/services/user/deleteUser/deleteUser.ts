import axios from "axios";
import { usersUrl } from "../../../api/paths";

export const deleteUser = async (id: string) => {
  //
  const url = `${usersUrl}/${id}`;

  try {
    //
    const { status } = await axios.delete(url);

    if (status !== 204) return null;
    return true;
  } catch (error) {
    //
    console.error(error);
    return null;
  }
};
