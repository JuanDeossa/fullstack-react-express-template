import "dotenv/config";

export const envs = {
  PORT: process.env.PORT || 8080,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
};
