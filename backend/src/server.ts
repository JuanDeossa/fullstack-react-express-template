import express from "express";
import cors from "cors";
import { envs } from "./config/envs";

export const server = express();
server.use(express.json()); // acepta json en las peticiones que requeran un body
server.use(express.urlencoded({ extended: true })); // acepta urlencoded en las peticiones que requeran un

const corsOptions = {
  origin: envs.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

server.use(cors(corsOptions));

// server.use(cors());
// server.use(
//   cors({
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     origin: "*",
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );
