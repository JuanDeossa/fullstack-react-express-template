import { Link } from "react-router-dom";
import { paths } from "../routes/paths";

export const Home = () => {
  //
  return (
    <div className="home">
      <Link to={paths.ADMIN_USERS}>Administrador de usuarios</Link>
    </div>
  );
};
