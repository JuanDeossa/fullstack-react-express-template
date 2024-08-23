import { User } from "../../../types/user";
import { publicAxios } from "../../axios";
import { paths } from "../../paths";

interface LoginDataResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> => {
  try {
    const { data: resData } = await publicAxios.post(
      `${paths.auth}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const data = resData.data as LoginDataResponse;

    return {
      token: data.token,
      id: data.user.id,
      email: data.user.email,
      name: data.user.name,
      role: data.user.role,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};
