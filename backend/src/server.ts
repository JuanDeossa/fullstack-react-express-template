import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors";

export const server = express();
server.use(express.json()); // acepta json en las peticiones que requeran un body
server.use(express.urlencoded({ extended: true })); // acepta urlencoded en las peticiones que requeran un

server.use(cors(corsOptions));
// server.use(cors());
