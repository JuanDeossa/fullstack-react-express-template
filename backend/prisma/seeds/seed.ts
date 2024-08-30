import bcrypt from "bcrypt";
import { envs } from "../../src/config/envs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //
  const {
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
    DEVELOPER_EMAIL,
    DEVELOPER_PASSWORD,
  } = envs;

  // Crea el usuario developer
  if (DEVELOPER_EMAIL === "" || DEVELOPER_PASSWORD === "") {
    console.error(
      "No se puede crear el usuario developer por falta de credenciales en el archivo .env"
    );
  } else {
    const hashedPassword = await bcrypt.hash(DEVELOPER_PASSWORD, 10);

    const developer = await prisma.user.upsert({
      where: { email: DEVELOPER_EMAIL },
      update: {},
      create: {
        email: DEVELOPER_EMAIL,
        password: hashedPassword,
        name: "Developer User",
        role: "DEVELOPER",
      },
    });

    console.table([developer.email, developer.role]);
  }

  // Crea el usuario super administrador
  if (SUPER_ADMIN_EMAIL === "" || SUPER_ADMIN_PASSWORD === "") {
    console.error(
      "No se puede crear el usuario super administrador por falta de credenciales en el archivo .env"
    );
  } else {
    const superHashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

    const superAdmin = await prisma.user.upsert({
      where: { email: SUPER_ADMIN_EMAIL },
      update: {},
      create: {
        email: SUPER_ADMIN_EMAIL,
        password: superHashedPassword,
        name: "Super Admin User",
        role: "SUPER_ADMIN",
      },
    });

    console.table([superAdmin.email, superAdmin.role]);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("error: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
