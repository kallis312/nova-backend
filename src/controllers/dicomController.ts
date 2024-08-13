import { jupiterServer } from '@/config/axiosConfig';
import prisma from '@/config/dbConfig';
import { dicomAnnotationVallidator } from '@/validators/dicomValidator';
import { Dicom } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const perPage = 10;

export const getDicomList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.params.page)
    if (isNaN(page) || page < 1) throw new Error('Invalid page')
    const total = await prisma.dicom.count()
    const dicoms = await prisma.dicom.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
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

    const existDicom = await prisma.dicom.findUnique({
      where: { id },
    })
    if (!existDicom) throw new Error('No dicom found');

    const response = await jupiterServer.get('/dicom/' + id, {
      responseType: 'stream'
    });

    // Download Dicom data usging dicoms.id from Jupiter Server

    res.setHeader('Content-Disposition', `attachment; filename="${id}.zip"`);
    res.setHeader('Content-Type', 'application/zip');

    response.data.pipe(res);
    response.data.on('error', (err: Error) => {
      throw new Error(err.message);
    })
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
    const { username } = req.user!
    const { id } = req.params
    const dicomAnnotation = dicomAnnotationVallidator.parse(req.body);
    const existDicom = await prisma.dicom.findUnique({
      where: { id }
    })

    if (!existDicom) throw new Error('No dicom found')

    const exsitDicomAnnotation = await prisma.annotation.findFirst({
      where: { dicomId: id, annotatedBy: username },
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
          annotatedBy: username,
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

export const getDicomFromJupiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jupiterDicoms = await jupiterServer.get<Dicom[]>('/dicoms');
    await prisma.dicom.deleteMany({
      where: {
        id: {
          notIn: jupiterDicoms.data.map(dicom => dicom.id)
        }
      }
    })
    const result = await Promise.all(jupiterDicoms.data.map(async dicom => {
      return await prisma.dicom.upsert({
        where: {
          id: dicom.id
        },
        create: dicom,
        update: dicom
      })
    }))
    res.json(result);
  } catch (error) {
    next(error)
  }
}