import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '../../utils/prisma';

export class RuleService {
  async create(rule: Prisma.RuleCreateInput) {
    const created = await prisma.rule.create({
      data: {
        type: 1,
        ...rule,
      },
    });
    return created;
  }
}
