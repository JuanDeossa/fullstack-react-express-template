import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { User } from "../types/user";
import { paths } from "./paths";
import { AdminUsersPage, LoginPage, HomePage } from "@/pages";

interface Props {
  user: User | null;
}

export const AppRouter = ({ user }: Props) => {
  return (
    <BrowserRouter>
      {
        <Routes>
          <Route element={<PrivateRoutes isAllowed={!!user} />}>
            <Route path={paths.HOME} element={<HomePage />} />
            <Route path={paths.ADMIN_USERS} element={<AdminUsersPage />} />
          </Route>
          <Route path={paths.ROOT} element={<LoginPage />} />
          <Route path={paths.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      }
    </BrowserRouter>
  );
};
