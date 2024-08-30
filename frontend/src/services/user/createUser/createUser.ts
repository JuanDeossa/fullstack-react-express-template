import axios from "axios";
import { usersUrl } from "../../../routes/paths";
import { CreateUser, UserResponse } from "../../../types";

export const createUser = async ({ email, password, name }: CreateUser) => {
  //
  try {
    //Axios
    const response = await axios.post(
      usersUrl,
      { email, password, name },
      {
        withCredentials: true,
      }
    );
    const user = response.data as UserResponse;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
