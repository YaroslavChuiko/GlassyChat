import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { GLOBAL_ROOM_NAME } from "../src/const/const";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma);

async function main() {
  const superAdmin = await adapter.createUser({
    name: process.env.SUPER_ADMIN_NAME!,
    email: process.env.SUPER_ADMIN_EMAIL!,
    emailVerified: new Date(),
  });

  const account = await adapter.linkAccount({
    provider: "github",
    type: "oauth",
    providerAccountId: "32570823", // the ID of the user with the OAuth Service (e.g. 12345)
    userId: superAdmin.id,
  });

  const room = await prisma.room.create({
    data: {
      name: GLOBAL_ROOM_NAME,
      type: "global",
      members: {
        create: {
          user: {
            connect: {
              id: superAdmin.id,
            },
          },
          role: "admin",
        },
      },
    },
  });
  console.log({ superAdmin, account, room });
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
