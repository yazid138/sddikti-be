import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const roleAdmin = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      id: 'd1b879d4-355d-4f3f-86e7-1875ca62cb97',
      name: 'admin',
    },
  });
  const director = await prisma.role.upsert({
    where: { name: 'direktur' },
    update: {},
    create: {
      id: '587d9fa0-7fa1-48cc-bbd7-e38a870160f3',
      name: 'direktur',
    },
  });
  const headDivision = await prisma.role.upsert({
    where: { name: 'kepala bagian' },
    update: {},
    create: {
      id: '49f3340b-5185-4a66-acc1-b85a79563b01',
      name: 'kepala bagian',
    },
  });
  const staff = await prisma.role.upsert({
    where: { name: 'staff' },
    update: {},
    create: {
      id: '09bd8bf8-1e18-4b5b-8512-421ce45ff18e',
      name: 'staff',
    },
  });
  const userUmum = await prisma.role.upsert({
    where: { name: 'user umum' },
    update: {},
    create: {
      id: '543be3e5-e184-414c-821f-d735c8ce76f0',
      name: 'user umum',
    },
  });
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash('123', salt);
  const admin = await prisma.user.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      password,
      email: 'admin',
      roleId: roleAdmin.id,
    },
  });
  console.log({ roleAdmin, director, headDivision, staff, userUmum, admin });
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
