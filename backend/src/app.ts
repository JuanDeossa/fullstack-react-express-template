import { server } from "./server";
import { envs } from "./config/envs";

const { PORT } = envs;

(async () => {
  server.get("/api/test", (_req, res) => {
    //
    try {
      res.status(200).json({
        success: true,
        data: {
          message: "success test",
        },
        error: null,
      });
    } catch (error: any) {
      res.status(500).json({
        success: true,
        data: {
          message: error?.message || "",
        },
        error: null,
      });
    }
  });

  server.delete("/api/test/:id", (_req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: "success test delete",
        id: _req.params.id,
      },
      error: null,
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
