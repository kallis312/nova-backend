import prisma from '@/config/dbConfig';
import { numIdValidator } from '@/validators/globalValidator';
import { presetCreatValidator, presetUpdateValidator } from '@/validators/labelValidator';
import { NextFunction, Request, Response } from 'express';

export const getLabelList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const labels = await prisma.labelPreset.findMany()
    res.json(labels)
  } catch (error) {
    next(error)
  }
}

export const createLabel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, labels } = presetCreatValidator.parse(req.body)
    const user = req.user!

    const existLabel = await prisma.labelPreset.findUnique({
      where: {
        name: name
      }
    })

    if (existLabel) throw new Error(`Label ${name} already exist`)

    await prisma.labelPreset.create({
      data: {
        name: name,
        creator: user.username,
        lables: labels
      }
    })

    res.json({
      message: "Label created successfully",
    })
  } catch (error) {
    next(error)
  }
}

export const updateLable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = numIdValidator.parse(req.params.id)
    const { labels, name } = presetUpdateValidator.parse(req.body)

    const existLabelPresetName = await prisma.labelPreset.findFirst({
      where: {
        id: {
          not: id
        },
        name
      }
    })

    if (existLabelPresetName) throw new Error('Username has been duplicated.');

    await prisma.labelPreset.update({
      data: {
        lables: labels,
        name: name
      },
      where: {
        id
      }
    })

    res.json({
      message: "Label updated successfully",
    })
  } catch (error) {
    next(error)
  }
}


export const deleteLable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = numIdValidator.parse(req.params.id)
    const user = req.user!

    const label = await prisma.labelPreset.findUnique({
      where: {
        id
      },
      include: {
        creatorUser: true
      }
    })

    if (label?.creatorUser.role !== 'ADMIN' && label?.creator !== user.username)
      throw new Error("Only admin, creator can delete label")

    await prisma.labelPreset.delete({
      where: { id }
    })

    res.json({
      message: "Label deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

