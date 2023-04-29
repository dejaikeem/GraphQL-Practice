import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// 유저의 게시글과 게시글의 댓글 조회
export const readUserPostsAndCommentsResolver = async (parent: any, args: { userId: any; }, context: any) => {
  const { userId } = args;
  const posts = await prisma.post.findMany({
    where: { authorId: userId, published: true, title: { contains: 'graphql' } },
    include: { comments: true },
  });
  return posts;
};
