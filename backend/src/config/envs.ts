import { error } from "console";
import "dotenv/config";

const CLIENT_URL = process.env.CLIENT_URL || "";

const getWhitelist = () => {
  try {
    //
    let whitelist: string[] = [];

    if (process.env.WHITELIST) {
      whitelist = [CLIENT_URL, ...process.env.WHITELIST?.trim().split(",,,")];
    }

    const filteredWhitelist = whitelist.filter((path) => path !== "");

    return filteredWhitelist;
  } catch (error) {}
  //
  console.error(error);
  return [];
};

export const envs = {
  PORT: process.env.PORT || 8080,
  CLIENT_URL: CLIENT_URL || "",
  WHITELIST: getWhitelist() || [],
  ACCESS_JWT_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_JWT_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "",
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "",
  DEVELOPER_EMAIL: process.env.DEVELOPER_EMAIL || "",
  DEVELOPER_PASSWORD: process.env.DEVELOPER_PASSWORD || "",
  ACCESS_TOKEN_EXPIRES_IN:
    Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 1000 * 60 * 60, // 1 hour
  REFRESH_TOKEN_EXPIRES_IN:
    Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 1000 * 60 * 60 * 24 * 30, // 30 days
  USERS_RATE_LIMIT: Number(process.env.USERS_RATE_LIMIT) || 1000,
};
