import type { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
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

    console.log(`🔎🐛 -> file: [token].ts -> line 13 -> data`, data);

    if (robotType.type === 'tg') {
      // 消息
      if (data.message && data.message.text) {
        let result;
        for (const rule of rules) {
          if (rule.type === 1) {
            result = await runInVM(
              rule.func,
              {
                type: robotType.type,
                data,
              },
              robot,
            );
            console.log(`🔎🐛 -> file: result`, result);
            if (result === true) {
              // 处理成功，跳过后续处理
              break;
            } else if (_.isString(result)) {
              // 如果返回的是文本 就直接回复消息
              const telegramBot = new TelegramBot(robot.token);
              await telegramBot.sendMessage(result, data.message.chat.id);
              console.log(`${data.message.chat.id}, 消息回复成功！`);
              break;
            }
            // 其他情况 继续执行
          }
        }
      }
    }

    return res.success();
  },
);
