import { privateAxios } from "../../axios";
import { paths } from "../../paths";

export const refreshTokenService = async (): Promise<string | null> => {
  try {
    const { data } = await privateAxios.post(`${paths.auth}/refresh-token`);

    return data.data.token;
  } catch (error) {
    console.error(error);

    return null;
  }
};
