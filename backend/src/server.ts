import express from "express";

export const server = express();
server.use(express.json()); // acepta json en las peticiones que requeran un body
server.use(express.urlencoded({ extended: true })); // acepta urlencoded en las peticiones que requeran un body