import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';
import { v4 as uuidv4 } from 'uuid';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const data = req.body;
    const webhook = await prisma.webhook.create({
      data: {
        name: data.name,
        robotId: data.robotId,
        token: uuidv4(),
      },
    });
    return res.success(webhook);
  },
);
