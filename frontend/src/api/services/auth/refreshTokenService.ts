import { User } from "../../../types/user";
import { privateAxios } from "../../axios";
import { authUrl } from "../../paths";

interface RefreshTokenDataResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const refreshTokenService = async (): Promise<User | null> => {
  try {
    const { data: resData } = await privateAxios.post(
      `${authUrl}/refresh-token`
    );

    const data = resData.data as RefreshTokenDataResponse;

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
