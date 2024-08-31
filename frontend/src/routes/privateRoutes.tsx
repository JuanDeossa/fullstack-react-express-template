import { Navigate, Outlet } from "react-router-dom";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { AppLayout } from "../layout/appLayout/appLayout";

interface Props {
  children?: React.ReactNode;
  isAllowed: boolean;
  redirectTo?: string;
}

export const PrivateRoutes = ({
  children,
  isAllowed,
  redirectTo = "/login",
}: Props) => {
  //
  useRefreshToken();

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return <AppLayout>{children ? children : <Outlet />}</AppLayout>;
};
