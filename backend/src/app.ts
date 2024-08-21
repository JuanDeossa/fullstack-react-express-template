import { server } from "./server";
import { envs } from "./config/envs";

const { PORT } = envs;

(async () => {
  server.use("/api/test", (req, res) => {
    console.log(req);
    res.send(`<h1>I am the backend</h1>`);
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
