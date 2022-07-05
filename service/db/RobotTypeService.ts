import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '../../utils/prisma';

export class RobotTypeService {
  static async create(robotType: Prisma.RobotTypeCreateInput) {
    const created = await prisma.robotType.create({
      data: {
        ...robotType,
      },
    });
    return created;
  }

  static async queryAll() {
    const robotTypeList = await prisma.robotType.findMany();
    return robotTypeList;
  }
}
