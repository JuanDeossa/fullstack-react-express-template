import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { setupInterceptors } from "../../api/interceptors/authInterceptor";
import { AppRouter } from "../../routes/appRouter";

export const AppContent = () => {
  //
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.token) {
      setupInterceptors(
        () => {
          return user.token;
        },
        (newToken) =>
          setUser((prev) => {
            return prev ? { ...prev, token: newToken } : null;
          })
      );
    }
  }, [user, setUser]);

  return (
    <>
      <AppRouter user={user} />
    </>
  );
};
