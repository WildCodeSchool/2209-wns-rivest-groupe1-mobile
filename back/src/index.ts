import "reflect-metadata";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/userResolver";
import dataSource from "./utils";
import { ImageResolver } from "./resolver/imageResolver";
import { CategoryResolver } from "./resolver/categoryResolver";
import { BlogResolver } from "./resolver/blogResolver";
import { ArticleResolver } from "./resolver/articleResolver";
import { CommentResolver } from "./resolver/commentResolver";
import { TagResolver } from "./resolver/tagResolver";
import { AdminResolver } from "./resolver/adminResolver";

dotenv.config();

const port = 5000;

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AdminResolver,
      ImageResolver,
      CategoryResolver,
      BlogResolver,
      ArticleResolver,
      CommentResolver,
      TagResolver,
    ],
    authChecker: ({ context }, roles) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

      if (!context.user === undefined) {
        return false;
      } else if (roles?.length === 0 || roles.includes(context.user.role)) {
        return true;
      } else {
        return false;
      }
    },
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      if (
        req.headers.authorization === undefined ||
        process.env.JWT_SECRET_KEY === undefined
      ) {
        return {};
      } else {
        try {
          const bearer = req.headers.authorization.split("Bearer ")[1];

          if (bearer) {
            const token = JSON.parse(bearer).token;
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return { user };
          } else {
            return {};
          }
        } catch (err) {
          console.log(err);
          return {};
        }
      }
    },
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  try {
    const { url }: { url: string } = await server.listen({ port });
    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.log("Error starting the server");
  }
};

void start();
