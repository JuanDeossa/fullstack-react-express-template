import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import { LoginForm } from "@/components";
import { Toaster } from "sonner";

export const LoginPage = () => {
  //
  const { user } = useAuth();

  if (user) {
    return <Navigate to={paths.HOME} replace />;
  }

  return (
    <>
      <div className="LoginPage min-h-screen bg-indigo-200 grid place-content-center">
        <LoginForm />
      </div>
      <Toaster />
    </>
  );
};
