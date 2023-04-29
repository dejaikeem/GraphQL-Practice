import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    name: String!
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Query {
    readUserPostsAndComments(userId: ID!): User!
  }

  type Mutation {
    createUser(email: String!, password: String!, name: String!): User!
    createPost(authorId: ID!, title: String!, content: String!, published: Boolean!): Post!
    createComment(authorId: ID!, postId: ID!, text: String!): Comment!
  }
`;