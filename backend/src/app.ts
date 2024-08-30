import { server } from "./server";
import { envs } from "./config/envs";
import { usersRouter } from "./users/routes";

const { PORT } = envs;

(async () => {
  server.use("/api/users", usersRouter);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
