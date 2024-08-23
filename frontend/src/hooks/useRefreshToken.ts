import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { refreshTokenService } from "../api/services";

export const useRefreshToken = () => {
  //
  const { setUser, user } = useAuth();

  useEffect(() => {
    const getAccessToken = async () => {
      const user = await refreshTokenService();
      if (user) {
        setUser(user);
      }
    };

    if (!user?.token) {
      getAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
