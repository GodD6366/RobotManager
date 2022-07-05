import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '../../utils/prisma';

export class RobotService {
  static async create(robot: Prisma.RobotCreateInput) {
    const created = await prisma.robot.create({
      data: {
        ...robot,
      },
    });
    return created;
  }

  static async queryAll() {
    const robotTypeList = await prisma.robot.findMany();
    return robotTypeList;
  }
}
