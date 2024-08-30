import axios from "axios";
import { baseUrl } from "../../../../routes/paths";
import { UserResponse } from "../../../types/user/user.interfaces";

export const getUsers = async () => {
  //
  const url = `${baseUrl}/users`;

  try {
    //Axios
    const response = await axios.get(url);
    const users = response.data as UserResponse[];
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};
