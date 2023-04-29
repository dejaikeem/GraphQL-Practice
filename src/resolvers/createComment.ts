import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// 댓글 작성
export const createCommentResolver = async (parent: any, args: { input: { content: any; postId: any; }; }, context: any) => {
  const { content, postId } = args.input;
  const comment = await prisma.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
    },
  });
  return comment;
};
