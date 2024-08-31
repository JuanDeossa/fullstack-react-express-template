import axios from "axios";
import { usersUrl } from "../../../api/paths";
import { UserResponse } from "../../../types/user/user.interfaces";

export const getUsers = async () => {
  //
  try {
    //Axios
    const response = await axios.get(usersUrl);
    const users = response.data as UserResponse[];
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};
