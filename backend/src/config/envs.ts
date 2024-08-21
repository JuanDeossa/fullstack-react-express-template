import "dotenv/config";

export const envs = {
  PORT: process.env.PORT || 8080,
  ACCESS_JWT_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_JWT_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || "",
};
