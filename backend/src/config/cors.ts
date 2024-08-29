import { envs } from "./envs";
import { CorsOptions } from "cors";

const { WHITELIST } = envs;

export const corsOptions: CorsOptions = {
  origin: (origin_: string | undefined, callback) => {
    if (origin_ && WHITELIST.includes(origin_)) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
