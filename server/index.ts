import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const server = new ApolloServer({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello GraphQL',
    },
  },
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
}

startServer();
