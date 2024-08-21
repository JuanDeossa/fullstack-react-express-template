import React, { useState, ReactNode, useEffect } from "react";
import { User } from "../types/user";
import { AuthContext } from "./authContext";
import { refreshTokenService } from "../api/services";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): ReactNode => {
  const [user, setUser] = useState<User | null>(null);

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
    getAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
