import { Navigate, Outlet } from "react-router-dom";
import { useRefreshToken } from "../hooks/useRefreshToken";

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

  return children ? children : <Outlet />;
};
