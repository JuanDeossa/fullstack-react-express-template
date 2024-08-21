import { server } from "./server";
import { envs } from "./config/envs";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { validateAccessMiddleware } from "./middlewares/auth.middleware";
const { PORT } = envs;
//

(async () => {
  // server.use("/", (_req, res) => {
  //   res.send("I am the backend");
  // });
  server.use("/api/auth", authRouter);
  server.use("/api/users", userRouter);

  server.use("/api/clients", validateAccessMiddleware, (_req, res) => {
    res.status(200).json({
      status: "success",
      code: "SUCCESS",
      message: "All clients retrieved successfully",
      data: [
        {
          id: 1,
          name: "Andrés",
        },
        {
          id: 2,
          name: "Juan",
        },
        {
          id: 3,
          name: "Walter",
        },
        {
          id: 4,
          name: "Maria",
        },
        {
          id: 5,
          name: "Hector",
        },
        // {
        //   id: 6,
        //   name: "Luis",
        // },
      ],
    });
  });

  server.use(errorMiddleware);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
