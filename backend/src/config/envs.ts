import "dotenv/config";

export const envs = {
  PORT: process.env.PORT || 8080,
  ACCESS_JWT_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_JWT_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || "",
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "",
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "",
  DEVELOPER_EMAIL: process.env.DEVELOPER_EMAIL || "",
  DEVELOPER_PASSWORD: process.env.DEVELOPER_PASSWORD || "",
  ACCESS_TOKEN_EXPIRES_IN:
    Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 1000 * 60 * 60, // 1 hour
  REFRESH_TOKEN_EXPIRES_IN:
    Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 1000 * 60 * 60 * 24 * 30, // 30 days
};
