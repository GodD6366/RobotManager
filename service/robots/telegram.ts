const TOKEN = '2007638730:AAFzCVT8BWUbUPkVaiqt0TB7z0qQZtIfzX8';
const CHAT_ID = '-597674232';

export default class TelegramBot {
  constructor(private token: string) {}

  async sendMessage(text: string, chatId: string = CHAT_ID) {
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
