import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';
import { nanoid } from 'nanoid';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const data = req.body;
    const webhook = await prisma.webhook.create({
      data: {
        name: data.name,
        robotId: data.robotId,
        token: nanoid(),
      },
    });
    return res.success(webhook);
  },
);
