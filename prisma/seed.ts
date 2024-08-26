import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { username: 'callisto' },
    update: {},
    create: { username: 'callisto', password: bcrypt.hashSync('callisto', 10), role: 'ADMIN' }
  })
  await prisma.user.upsert({
    where: { username: 'testuser' },
    update: {},
    create: { username: 'testuser', password: bcrypt.hashSync('testuser', 10) }
  })

  await prisma.dicom.deleteMany()
  await prisma.dicom.createMany({
    data: Array.from({ length: 1000 }).map((_val, idx) => {
      const str = idx < 10 ? `00${idx}` : idx < 100 ? `0${idx}` : idx
      return {
        id: `dicom${str}`,
        patientId: `patient${str}`,
        modality: 'MRI',
        studyDate: new Date(),
        status: idx === 1 ? 'annotated' : 'unannotated'
      }
    }),
    skipDuplicates: true
  })

  await prisma.annotation.deleteMany()
  await prisma.annotation.createMany({
    data: [
      {
        annotatedBy: 'testuser',
        dicomId: 'dicom001',
        slices: Array.from({ length: 5 }).map((_val, sliceIndexidx) => {
          return {
            sliceIndexidx,
            annotations: Array.from({ length: 3 }).map(() => {
              return {
                type: 'polygon',
                label: 'tumor',
                poinst: [[10, 20], [15, 25], [20, 20], [15, 15]]
              }
            })
          }
        })
      }
    ],
    skipDuplicates: true
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