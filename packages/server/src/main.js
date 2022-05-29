import { createServer } from "http";
import { parse } from "querystring";
import cors from "cors";

import express from "express";

const server = express();

server.use(cors());

server.get("/status", (_, response) => {
  response.send({
    status: "Okay",
  });
});

const enableCors = cors({ origin: "http://localhost:3000" });

server.post("/authenticate", express.json(), (request, response) => {
  console.log("email: ", request.body.email, "Senha: ", request.body.password);
  response.send({
    Okay: true,
  });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at ${HOSTNAME}:${PORT}`);
});
