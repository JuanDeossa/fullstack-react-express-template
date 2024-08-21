import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {
  const currentUserContext = useContext(AuthContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  const { user, setUser } = currentUserContext;

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    setUser,
    logout,
  };
};
