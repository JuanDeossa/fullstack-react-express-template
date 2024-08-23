import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { refreshTokenService } from "../api/services";

export const useRefreshToken = () => {
  //
  const { setUser, user } = useAuth();

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await refreshTokenService();
      if (token) {
        setUser({
          email: "test.user@test.com",
          id: "123",
          token: token,
        });
      }
    };

    if (!user?.token) {
      getAccessToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
