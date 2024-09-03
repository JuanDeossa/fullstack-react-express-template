import { throwErrorAlert } from "@/utils/alerts";
import { User } from "../../../types/user";
import { publicAxios } from "../../axios";
import { authUrl } from "../../paths";

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
      `${authUrl}/login`,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Error de inicio de sesión";
    throwErrorAlert(message);

    return null;
  }
};
