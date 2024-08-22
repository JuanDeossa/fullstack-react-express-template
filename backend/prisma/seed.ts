import bcrypt from "bcrypt";
import { envs } from "../src/config/envs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  //
  const {
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
  } = envs;

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

    console.log(`super admin registered: ${superAdmin.email}`);
  }

  // Crea el usuario administrador
  if (ADMIN_EMAIL === "" || ADMIN_PASSWORD === "") {
    console.error(
      "No se puede crear el usuario administrador por falta de credenciales en el archivo .env"
    );
  } else {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {},
      create: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: "Admin User",
        role: "ADMIN",
      },
    });

    console.log(`admin registered: ${admin.email}`);
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
