import { AxiosError } from "axios";
import { privateAxios } from "../../axios";
import { paths } from "../../paths";

export const logoutService = async (): Promise<boolean> => {
  try {
    const { status, data } = await privateAxios.post(
      `${paths.auth}/logout`,
      {},
      { withCredentials: true }
    );
    if (status === 200 && data.success === true) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.status === 401 &&
        error.response.data.code === "INVALID_REFRESH_TOKEN"
      ) {
        return true;
      }
    }

    return false;
  }
};
