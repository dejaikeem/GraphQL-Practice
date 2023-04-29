import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from './typeDefs';
import { createUserResolver } from './resolvers/createUser';
import { createPostResolver} from './resolvers/createPost';
import { createCommentResolver } from './resolvers/createComment';
import { readUserPostsAndCommentsResolver } from './resolvers/readUserPostsAndComment';

const prisma = new PrismaClient();

const server = new ApolloServer({
  resolvers: {
    Query: {
      readUserPostsAndComments: (parent, args, context) => readUserPostsAndCommentsResolver(parent, args, context),
    },
    Mutation: {
      createUser: (parent, args, context) => createUserResolver(parent, args, context),
      createPost: (parent, args, context) => createPostResolver(parent, args, context),
      createComment: (parent, args, context) => createCommentResolver(parent, args, context),
    },
  },
  typeDefs,
  context: () => {
    return { prisma }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
