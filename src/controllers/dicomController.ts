import prisma from '@/config/dbConfig';
import { dicomAnnotationVallidator } from '@/validators/dicomValidator';
import { NextFunction, Request, Response } from 'express';

const perPage = 10;

export const getDicomList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.params.page)
    if (isNaN(page)) throw new Error('Invalid page')
    const total = await prisma.dicom.count()
    const dicoms = await prisma.dicom.findMany({
      skip: (page - 1) * 10,
      take: 10,
    })
    res.json({
      total,
      page,
      perPage,
      dicoms
    });
  } catch (error) {
    next(error)
  }
}

export const getDicom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const _dicoms = await prisma.dicom.findUnique({
      where: { id },
    })
    // Download Dicom data usging dicoms.id from Jupiter Server
    res.json({
      message: 'Downloading...'
    });
  } catch (error) {
    next(error)
  }
}

export const getAnnotation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const annotation = await prisma.annotation.findFirst({
      where: {
        dicomId: id
      },
      orderBy: {
        annotatedAt: 'desc'
      },
      select: {
        annotatedAt: true,
        annotatedBy: true,
        slices: true,
      }
    })
    res.json(annotation);
  } catch (error) {
    next(error)
  }
}

export const actionAnnotation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!
    console.log(user)
    const { id } = req.params
    const dicomAnnotation = dicomAnnotationVallidator.parse(req.body);
    const existDicom = await prisma.dicom.findUnique({
      where: { id }
    })

    if (!existDicom) throw new Error('No dicom found')

    const exsitDicomAnnotation = await prisma.annotation.findFirst({
      where: { dicomId: id, annotatedBy: 'callisto' },
      orderBy: {
        annotatedAt: 'desc'
      }
    })

    let resultDicomAnnotation
    if (exsitDicomAnnotation) {
      resultDicomAnnotation = await prisma.annotation.update({
        where: { id: exsitDicomAnnotation.id },
        data: {
          slices: dicomAnnotation.slices
        },
        select: {
          slices: true
        }
      })
    } else {
      resultDicomAnnotation = await prisma.annotation.create({
        data: {
          dicomId: id,
          annotatedBy: 'callisto',
          slices: dicomAnnotation.slices
        },
        select: {
          slices: true
        }
      })
    }
    res.json(resultDicomAnnotation);
  } catch (error) {
    next(error)
  }
}