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
};
