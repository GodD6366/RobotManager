import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../utils/prisma';
import { MyNextApiResponse, nc, runInVM } from '../../../../../service';
import TelegramBot from '../../../../../service/robots/telegram';
import { TTelegramBotWebhookMessage } from '../../../../../types/webhook/telegram';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const { token } = req.query as {
      token: string;
    };
    const data = req.body as TTelegramBotWebhookMessage;

    const webhook = await prisma.webhook.findFirst({
      where: {
        token,
      },
    });
    const robot = await prisma.robot.findFirst({
      where: {
        id: webhook.robotId,
      },
    });
    const robotType = await prisma.robotType.findFirst({
      where: {
        id: robot.robotTypeId,
      },
    });
    const rules = await prisma.rule.findMany({
      where: {
        robotId: robot.id,
      },
      orderBy: {
        priority: 'desc',
      },
    });

    if (robotType.type === 'tg') {
      let result;
      for (const rule of rules) {
        if (rule.type === 1) {
          result = runInVM(rule.func, {
            type: robotType.type,
            data,
          });

          const telegramBot = new TelegramBot(robot.token);
          await telegramBot.sendMessage(result, data.message.chat.id);
        }

        if (result) {
          break;
        }
      }
    }

    return res.success();
  },
);
