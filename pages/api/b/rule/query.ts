import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';

export default nc().get(async (req: NextApiRequest, res: MyNextApiResponse) => {
  const { robotId } = req.query as {
    robotId: string;
  };
  const rules = await prisma.rule.findMany(
    robotId && {
      where: {
        robotId: parseInt(robotId),
      },
    },
  );

  return res.success(rules);
});
