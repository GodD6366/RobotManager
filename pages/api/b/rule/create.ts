import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';
import { RuleService } from '../../../../service/db/rule';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const { name, robotId, func, priority } = req.body;
    const ruleService = new RuleService();
    await ruleService.create({
      name,
      robotId: parseInt(robotId),
      priority,
      func,
    });
    return res.success();
  },
);
