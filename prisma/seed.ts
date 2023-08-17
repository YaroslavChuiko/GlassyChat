import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, type UserColor } from "@prisma/client";
import { GLOBAL_ROOM_NAME } from "../src/const/const";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma);

async function main() {
  const superAdmin = await adapter.createUser({
    name: process.env.SUPER_ADMIN_NAME!,
    email: process.env.SUPER_ADMIN_EMAIL!,
    emailVerified: new Date(),
    // @ts-ignore
    color: "USER_COLOR_1" as UserColor, //???? strange error
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
      color: "ROOM_COLOR_1",
      type: "GLOBAL",
      members: {
        create: {
          user: {
            connect: {
              id: superAdmin.id,
            },
          },
          role: "ADMIN",
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
