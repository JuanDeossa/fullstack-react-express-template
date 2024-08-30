import axios from "axios";
import { baseUrl } from "../../../../routes/paths";

export const deleteUser = async (id: string) => {
  //
  const url = `${baseUrl}/users/${id}`;

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
