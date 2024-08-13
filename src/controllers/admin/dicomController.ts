import { reviewDicomService } from '@/services/dicomService';
import { reviewDicomValidator } from '@/validators/dicomValidator';
import { NextFunction, Request, Response } from 'express';

export const dicomReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = reviewDicomValidator.parse(req.body);
    await reviewDicomService(id, body);

    return res.json({ message: "Successfully" });
  } catch (error) {
    next(error);
  }
}