import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  {
    const start = new Date().getTime();
    await prisma.user.create({
      data: { name: 'Fist user', email: 'fist@gmail.com' },
    });
    const end = new Date().getTime();

    console.log(`Save operation : ${end - start}ms`);
  }
  {
    const start = new Date().getTime();
    await prisma.user.findMany();
    const end = new Date().getTime();
    console.log(`Find operation : ${end - start}ms`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
