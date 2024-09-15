import { ServiceResponse } from "@/types";
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
}): Promise<ServiceResponse> => {
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
      status: "success",
      message: "Login exitoso",
      data: data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data?.message || "Error de inicio de sesión",
      data: null,
    };
  }
};
