import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import { loginService } from "@/api/services";
import { useAuth, useNav } from "@/hooks";
import { LoginForm, Spinner } from "@/components";
import { throwErrorAlert } from "@/utils/alerts";
import { paths } from "@/routes/paths";
import { ThemeProvider } from "@/context/theme-provider";

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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="LoginPage min-h-screen grid place-content-center">
          {isLoading ? <Spinner /> : <LoginForm onSubmit={handleLogin} />}
        </div>
      </ThemeProvider>

      <Toaster />
    </>
  );
};
