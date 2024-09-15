import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import { loginService } from "@/api/services";
import { useAuth, useNav } from "@/hooks";
import { LoginForm, Spinner } from "@/components";
import { throwErrorAlert } from "@/utils/alerts";
import { paths } from "@/routes/paths";

export const LoginPage = () => {
  //
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNav();
  const { user, login } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    setIsLoading(true);

    const { data: dataResponse, message } = await loginService({
      email: data?.email || "",
      password: data?.password || "",
    });

    setIsLoading(false);

    if (!dataResponse) {
      throwErrorAlert(message);
      return;
    }

    const { user, token } = dataResponse;

    navigate({ path: paths.HOME, replace: false });

    login({
      id: user.id,
      token: token,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  };

  if (user) {
    return <Navigate to={paths.HOME} replace />;
  }

  return (
    <>
      <div className="LoginPage min-h-screen bg-gray-50 grid place-content-center">
        {isLoading ? <Spinner /> : <LoginForm onSubmit={handleLogin} />}
      </div>

      <Toaster />
    </>
  );
};
