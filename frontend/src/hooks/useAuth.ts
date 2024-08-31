import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { User } from "../types/user";

export const useAuth = () => {
  const currentUserContext = useContext(AuthContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  const { user, setUser } = currentUserContext;

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    setUser,
    login,
    logout,
  };
};
