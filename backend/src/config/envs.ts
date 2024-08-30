import { error } from "console";
import "dotenv/config";

const CLIENT_URL = process.env.CLIENT_URL || "";

const getWhitelist = () => {
  try {
    //
    let whitelist: string[] = [CLIENT_URL];

    if (process.env.WHITELIST) {
      whitelist = [...process.env.WHITELIST?.trim().split(",,,")];
    }

    return whitelist.filter((path) => path !== "");
  } catch (error) {}
  //
  console.error(error);
  return [];
};

export const envs = {
  PORT: process.env.PORT || 8080,
  CLIENT_URL: CLIENT_URL,
  WHITELIST: getWhitelist() || [],
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "",
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "",
  DEVELOPER_EMAIL: process.env.DEVELOPER_EMAIL || "",
  DEVELOPER_PASSWORD: process.env.DEVELOPER_PASSWORD || "",
  USERS_RATE_LIMIT: Number(process.env.USERS_RATE_LIMIT) || 1000,
};
