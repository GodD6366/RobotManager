import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc, RobotService } from '../../../../service';
import { Robot } from '@prisma/client';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const { name, robotTypeId, token, secret, ownerId } = req.body as Robot;
    const robot = await RobotService.create({
      name,
      robotTypeId,
      token,
      secret,
      ownerId: 1,
    });

    return res.success(robot);
  },
);
