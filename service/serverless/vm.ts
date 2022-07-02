import vm from 'vm';
import { TTelegramBotWebhookMessage } from '../../types/webhook/telegram';

const vmThis = {
  isTGMessage(data) {
    return data.type === 'tg';
  },
  getMessage(data) {
    if (this.isTGMessage(data)) {
      return (data.data as TTelegramBotWebhookMessage).message.text;
    }
  },
};

export function runInVM(fn: string, data: any) {
  const result = vm.runInNewContext(
    `${fn}
index.bind(vmThis)(data)`,
    { vmThis, data },
  );
  return result;
}
