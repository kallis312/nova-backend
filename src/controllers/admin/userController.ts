import prisma from '@/config/dbConfig';
import { userCreateValidator, userPasswordValidator, userUpdateValidator } from '@/validators/userValidator';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 1)
    if (isNaN(page) || page < 1) throw new Error('Invalid page')
    const limit = Number(req.query.limit ?? 100)
    if (isNaN(limit) || limit < 10) throw new Error('Invalid per page number')

    const total = await prisma.user.count()
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    res.json({
      total,
      page,
      perPage: limit,
      users
    });
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) throw new Error('Invalid user id.');

    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        role: true
      }
    })
    res.json(user);
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error('Invalid user id.');
    const { username, role } = userUpdateValidator.parse(req.body);

    const existUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!existUser) throw new Error('User does not exist.')

    const existUserName = await prisma.user.findFirst({
      where: {
        id: {
          not: id
        },
        username
      }
    })

    if (existUserName) throw new Error('Username has been duplicated.');

    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        username,
        role
      },
      select: {
        id: true,
        username: true,
        role: true
      }
    })

    res.json(updatedUser);
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, username, role } = userCreateValidator.parse(req.body);

    const existUser = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (existUser) throw new Error('Use already exists.')

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: bcrypt.hashSync(password, 10),
        role
      },
      select: {
        id: true,
        username: true,
        role: true
      },
    })
    res.json(createdUser);
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) throw new Error('Invalid user id.');

    const existUser = await prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!existUser) throw new Error('User does not exist.');

    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    })

    res.json({
      message: `${deletedUser.username} has been successfully deleted.`
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new Error('Invalid user id.');
    const { password } = userPasswordValidator.parse(req.body);

    const existUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!existUser) throw new Error('User does not exist.')

    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        password: bcrypt.hashSync(password, 10)
      }
    })

    res.json({
      message: `${updatedUser.username}'s password was successfully updated.`
    });
  } catch (error) {
    next(error)
  }
}