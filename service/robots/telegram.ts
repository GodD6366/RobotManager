export default class TelegramBot {
  constructor(private token: string) {}

  async sendMessage(text: string, chatId: number) {
    const payload = {
      chat_id: chatId,
      text,
    };
    return await fetch(
      `https://api.telegram.org/bot${this.token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
  }
}
