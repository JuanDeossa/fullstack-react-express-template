import axios from "axios";
import { baseUrl } from "../../../../routes/paths";
import { CreateUser } from "../../../types";

export const createUser = async ({ email, password, name }: CreateUser) => {
  //
  const url = `${baseUrl}/users`;

  try {
    //Axios
    const response = await axios.post(
      url,
      { email, password, name },
      {
        withCredentials: true,
      }
    );
    const user = response.data;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
