import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// 유저 생성
export const createUserResolver = async (parent: any, args: { input: { email: any; password: any; name: any; }; }, context: any) => {
  const { email, password, name } = args.input;
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  return user;
};