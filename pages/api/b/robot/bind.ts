import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';
import { MyNextApiResponse, nc } from '../../../../service';
import TelegramBot from '../../../../service/robots/telegram';
import { WebhookService } from '../../../../service/db';
import { WEBHOOK_BASE_URL } from '../../../../utils';

export default nc().post(
  async (req: NextApiRequest, res: MyNextApiResponse) => {
    const data = req.body;
    const robot = await prisma.robot.findFirst({
      where: {
        id: data.id,
      },
    });

    // telegramBot
    if (true) {
      const telegramBot = new TelegramBot(robot.token);
      await telegramBot.deleteWebhook();

      const webhookService = new WebhookService();
      const webhook = await webhookService.create(
        robot.name + 'webhook',
        robot.id,
      );
      await telegramBot.setWebhook(WEBHOOK_BASE_URL + webhook.token);
    }
    return res.success();
  },
);
