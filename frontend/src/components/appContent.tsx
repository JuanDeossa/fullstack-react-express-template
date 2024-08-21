import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Home } from "./home";
import { LoginForm } from "./loginForm";
import { setupInterceptors } from "../api/interceptors/authInterceptor";

export const AppContent = () => {
  //
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.token) {
      setupInterceptors(
        () => user.token,
        (newToken) =>
          setUser((prev) => {
            return prev ? { ...prev, token: newToken } : null;
          })
      );
    }
  }, [user, setUser]);

  return (
    <>
      {!user ? (
        <div className="login min-h-screen bg-indigo-200 grid place-content-center">
          <LoginForm />
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};
