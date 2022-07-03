import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '../../utils/prisma';

export class UserService {
  static async get(name: string) {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });
    return user;
  }
}
