import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: 'password1',
      name: 'Alice',
      posts: {
        create: {
          title: 'Post 1 by Alice',
          content: 'Content for post 1 by Alice',
          published: true,
          comments: {
            create: {
              content: 'Comment on post 1 by Alice',
            }
          }
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: 'password2',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Post 1 by Bob',
            content: 'Content for post 1 by Bob',
            published: true,
            comments: {
              create: [
                {
                  content: 'Comment 1 on post 1 by Bob',
                },
                {
                  content: 'Comment 2 on post 1 by Bob',
                }
              ]
            }
          },
          {
            title: 'Post 2 by Bob',
            content: 'Content for post 2 by Bob',
            published: true,
            comments: {
              create: {
                content: 'Comment on post 2 by Bob',
              }
            }
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'carol@example.com' },
    update: {},
    create: {
      email: 'carol@example.com',
      password: 'password3',
      name: 'Carol',
      posts: {
        create: {
          title: 'Post 1 by Carol',
          content: 'Content for post 1 by Carol',
          published: false,
          comments: {
            create: [
              {
                content: 'Comment 1 on post 1 by Carol',
              },
              {
                content: 'Comment 2 on post 1 by Carol',
              }
            ]
          }
        },
      },
    },
  });

  console.log({ user1, user2, user3 });
  console.log('Seeding completed!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });