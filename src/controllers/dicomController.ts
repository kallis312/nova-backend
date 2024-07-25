import { NextFunction, Request, Response } from 'express';

export const getDicomList = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
}

export const getDicom = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
}

export const getAnnotation = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
}

export const actionAnnotation = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: ''
    });
  } catch (error) {
    next(error)
  }
}