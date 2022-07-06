import { Robot } from '@prisma/client';
import vm from 'vm';
import { TTelegramBotWebhookMessage } from '../../types/webhook/telegram';
import { sendMessageToDing } from './ding';
import { talkWithTuling } from './tuling';

function makeContent(robot: Robot) {
  const vmThis = {
    isTGMessage(message: any) {
      return message.type === 'tg';
    },
    getMessage(message: any) {
      if (this.isTGMessage(message)) {
        return (message.data as TTelegramBotWebhookMessage).message.text;
      }
    },
    isAdmin(message: any) {
      if (this.isTGMessage()) {
        const fromId = (message.data as TTelegramBotWebhookMessage).message.from
          .id;
        return fromId === 736114845;
      }
      return false;
    },

    async talkWithTuling(text: string) {
      return await talkWithTuling(text);
    },
    async forwardToDing(text: string) {
      await sendMessageToDing(text, robot.groupId);
      return true;
    },
  };
  return vmThis;
}

export async function runInVM(fn: string, message: any, robot: Robot) {
  const content = vm.createContext({ vmThis: makeContent(robot), message });
  const result = vm.runInNewContext(
    `${fn}
index.bind(vmThis)(message)
`,
    content,
  );
  return await result;
}
