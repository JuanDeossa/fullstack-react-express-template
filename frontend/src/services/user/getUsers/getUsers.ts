import { usersUrl } from "../../../api/paths";
import { UserResponse } from "../../../types/user/user.interfaces";
import { privateAxios } from "../../../api/axios";

export const getUsers = async () => {
  //
  try {
    //
    const response = await privateAxios.get(usersUrl);
    const users = response.data.data as UserResponse[];
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};
