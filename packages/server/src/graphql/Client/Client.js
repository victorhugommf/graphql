import { gql } from "apollo-server-express";
import createRepository from "../../io/Database/createRepository";

const clientRepository = createRepository("client");

export const typeDefs = gql`
  type Client implements Node {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  type ClientList implements List {
    items: [Client!]!
    totalItems: Int!
  }

  extend type Query {
    client(id: ID!): Client
    clients: ClientList
  }
`;

export const resolvers = {
  Query: {
    client: async (_, { id }) => {
      const clients = await clientRepository.read();
      console.log("Reading client repository...");
      console.log(clients.find((client) => client.id === id));
      return clients.find((client) => client.id === id);
    },
    clients: async (_, args) => {
      console.log("Reading repository to return clients");
      const clientsList = await clientRepository.read();

      return {
        items: clientsList,
        totalItems: clientsList.length,
      };
    },
  },
};
