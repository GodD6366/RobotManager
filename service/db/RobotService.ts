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
    const robots = await prisma.robot.findMany();
    return robots;
  }

  static async query(data: Prisma.RobotWhereInput) {
    const robot = await prisma.robot.findFirst({
      where: {
        ...data,
      },
    });
    return robot;
  }
}
