import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { envs } from "./config/envs";

export const server = express();
server.use(express.json()); // acepta json en las peticiones que requeran un body
server.use(cookieParser());
server.use(cors({ credentials: true, origin: envs.FRONTEND_BASE_URL }));
server.use(express.urlencoded({ extended: true })); // acepta urlencoded en las peticiones que requeran un body
