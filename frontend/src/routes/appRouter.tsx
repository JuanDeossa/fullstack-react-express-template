import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { Home } from "../components/home";
import { User } from "../types/user";
import { LoginPage } from "../components/loginPage";
import { paths } from "./paths";
import { AdminUsersPage } from "../components";

interface Props {
  user: User | null;
}

export const AppRouter = ({ user }: Props) => {
  return (
    <BrowserRouter>
      {
        <Routes>
          <Route element={<PrivateRoutes isAllowed={!!user} />}>
            <Route path={paths.HOME} element={<Home />} />
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
