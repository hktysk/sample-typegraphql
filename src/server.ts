import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user.resolver';

const server = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  // Set up Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
}

server()