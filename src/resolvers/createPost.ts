import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// 게시글 작성
export const createPostResolver = async (parent: any, args: { input: { title: any; content: any; published: any; authorId: any; }; }, context: any) => {
  const { title, content, published, authorId } = args.input;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published,
      author: { connect: { id: authorId } },
    },
  });
  return post;
};
