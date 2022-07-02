import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';

export default nc().get(async (req: NextApiRequest, res: MyNextApiResponse) => {
  const { userId } = req.query as {
    userId: string;
  };
  const robots = await prisma.robot.findMany(
    userId && {
      where: {
        ownerId: parseInt(userId),
      },
      orderBy: {
        updatedAt: 'asc',
      },
    },
  );

  return res.success(robots);
});
