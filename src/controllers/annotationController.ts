import { NextFunction, Request, Response } from "express";
import {
  medSAMActionValidator,
  monaiActionValidator,
} from "@/validators/annotationValidator";
import {
  medSAMActionService,
  monaiActionService,
} from "@/services/annotationService";

export const medSAMAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = medSAMActionValidator.parse(req.body);
    const segmentation = await medSAMActionService(body);

    return res.json({
      segmentation: segmentation?.Prediction,
    });

    //mock data
    // res.json({
    //   segmentation: {
    //     type: "polygon",
    //     label: "auto_detected_region",
    //     points: [
    //       [145, 195],
    //       [155, 205],
    //       [165, 200],
    //       [155, 190],
    //     ],
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

export const monaiAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = monaiActionValidator.parse(req.body);
    const segmentation = await monaiActionService(body);

    //mock data
    // res.json({
    //   segmentation: [
    //     {
    //       type: "polygon",
    //       label: "auto_detected_region",
    //       points: [
    //         [145, 195],
    //         [155, 205],
    //         [165, 200],
    //         [155, 190],
    //       ],
    //     },
    //     {
    //       type: "polygon",
    //       label: "auto_detected_region",
    //       points: [
    //         [145, 195],
    //         [155, 205],
    //         [165, 200],
    //         [155, 190],
    //       ],
    //     },
    //     {
    //       type: "polygon",
    //       label: "auto_detected_region",
    //       points: [
    //         [145, 195],
    //         [155, 205],
    //         [165, 200],
    //         [155, 190],
    //       ],
    //     },
    //     {
    //       type: "polygon",
    //       label: "auto_detected_region",
    //       points: [
    //         [145, 195],
    //         [155, 205],
    //         [165, 200],
    //         [155, 190],
    //       ],
    //     },
    //   ],
    // });

    if (!segmentation.Prediction) {
      return res.json({ approximateTime: segmentation.ApproximateTime });
    }

    return res.json({
      segmentation: segmentation?.Prediction,
    });
  } catch (error) {
    next(error);
  }
};
