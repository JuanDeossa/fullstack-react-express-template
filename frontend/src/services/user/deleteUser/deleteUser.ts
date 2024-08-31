import axios from "axios";
import { usersUrl } from "../../../api/paths";

export const deleteUser = async (id: string) => {
  //
  try {
    //
    const { status } = await axios.delete(`${usersUrl}/${id}`);

    if (status !== 204) return null;
    return true;
  } catch (error) {
    //
    console.error(error);
    return null;
  }
};
