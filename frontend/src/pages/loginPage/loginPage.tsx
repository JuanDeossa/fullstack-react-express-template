import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { paths } from "../../routes/paths";
import { Toaster } from "sonner";
import { useState } from "react";
import { loginService } from "@/api/services";
import { useNav } from "@/hooks/useNav";
import { Spinner } from "@/components/common/loaders/spinner/spinner";
import { LoginForm } from "@/components";

export const LoginPage = () => {
  //
  const { navigate } = useNav();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    const user = await loginService({
      email: data?.email || "",
      password: data?.password || "",
    });

    setIsLoading(false);

    if (!user) return;

    login(user);

    navigate({ path: paths.HOME, replace: false });
  };

  const { user, login } = useAuth();

  if (user) {
    return <Navigate to={paths.HOME} replace />;
  }

  if (isLoading) {
    return (
      <div className="LoginPage-loader min-h-screen bg-gray-50 grid place-content-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="LoginPage min-h-screen bg-gray-50 grid place-content-center">
        <LoginForm onSubmit={handleLogin} />
      </div>
      <Toaster />
    </>
  );
};
