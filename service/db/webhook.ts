import { Prisma } from '@prisma/client';
import { nanoid } from 'nanoid';
import prisma from '../../utils/prisma';

export class WebhookService {
  async create(name: string, robotId: number) {
    const created = await prisma.webhook.create({
      data: {
        name,
        robotId,
        token: nanoid(),
      },
    });
    return created;
  }
}
