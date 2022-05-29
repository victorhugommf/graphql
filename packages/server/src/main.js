import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://127.0.0.1:3000",
    },
    bodyParserConfig: true,
  });
}

startServer();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at ${HOSTNAME}:${PORT}`);
});
