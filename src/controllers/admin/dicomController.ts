import prisma from '@/config/dbConfig';
import { reviewDicomValidator } from '@/validators/dicomValidator';
import { EDicomReview, EDicomStatus } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const dicomReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.user!
    const { id } = req.params;
    const body = reviewDicomValidator.parse(req.body);
    const dicom = await prisma.dicom.findUnique({
      where: { id: id },
    });

    if (!dicom) throw new Error("Not found dicom");
    if (dicom.status === EDicomStatus.unannotated)
      throw new Error("Dicom not annotated yet");

    await prisma.dicom.update({
      where: { id: id },
      data: {
        status: (body.status === EDicomReview.accept || dicom.status === EDicomStatus.annotated) ? 'annotated' : 'unannotated',
        reviewBy: username,
        review: body.status
      },
    });

    return res.json({ message: "Successfully" });
  } catch (error) {
    next(error);
  }
}

export const getDicomAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pending = await prisma.dicom
      .count({
        where: {
          review: 'pending'
        }
      })
    const dicoms = await prisma.dicom.count()
    const annotated = await prisma.dicom.count({
      where: {
        status: 'annotated'
      }
    })

    return res.json({
      pending,
      dicoms,
      annotated,
      unannotated: dicoms - annotated
    });
  } catch (error) {
    next(error);
  }
}


export const getPendingList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pendingList = await prisma.dicom.findMany({
      where: {
        review: 'pending'
      }
    })

    return res.json(pendingList);
  } catch (error) {
    next(error);
  }
}
