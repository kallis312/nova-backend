import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { username: 'callisto' },
    update: {},
    create: { username: 'callisto', password: bcrypt.hashSync('admin', 10), role: 'ADMIN' }
  })
  await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: { username: 'testuser', password: bcrypt.hashSync('admin', 10) }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })