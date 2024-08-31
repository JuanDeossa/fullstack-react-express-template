import { server } from "./server";
import { envs } from "./config/envs";
import { usersRouter } from "./modules/users/users.route";

import authRouter from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
const { PORT } = envs;
//

(async () => {
  server.use("/api/users", usersRouter);
  server.use("/api/auth", authRouter);

  server.use(errorMiddleware);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
