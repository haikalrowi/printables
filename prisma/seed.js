// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const password =
    "927c8db71b7a991cf8ab75479b09e536026cd0a522b1d7de6d0234fb2f8d2b22387021e4fca3e12bffd0adc99723e9c5b638a6fa478a878d633c99396ece9c5e";
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      Password: { create: { password } },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      Password: { create: { password } },
    },
  });
  console.log({ alice, bob });
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
