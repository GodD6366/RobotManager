import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const data = req.body;
    await prisma.rule.update({
      where: {
        id: data.id,
      },
      data: {
        function: data.function,
      },
    });

    return res.success();
  },
);
