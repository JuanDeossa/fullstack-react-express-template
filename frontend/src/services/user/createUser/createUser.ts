import { usersUrl } from "../../../api/paths";
import { CreateUser, UserResponse } from "../../../types";
import { privateAxios } from "../../../api/axios";

export const createUser = async ({ email, password, name }: CreateUser) => {
  //
  try {
    //Axios
    const response = await privateAxios.post(
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
