export default class TelegramBot {
  constructor(private token: string) {}

  async sendMessage(text: string, chatId: number) {
    const payload = {
      chat_id: chatId,
      text,
    };
    return await this._request_post(`sendMessage`, payload);
  }

  async deleteMessage(messageId: number, chatId: number) {
    const payload = {
      message_id: messageId,
      chat_id: chatId,
    };
    return await this._request_post(`deleteMessage`, payload);
  }

  async forwardMessage(text: string, chatId: number, fromChatId: number) {
    const payload = {
      from_chat_id: fromChatId,
      chat_id: chatId,
      text,
    };
    return await this._request_post(`forwardMessage`, payload);
  }

  async setWebhook(webhook: string) {
    return await this._request_get(`setWebhook?url=${webhook}`);
  }

  async deleteWebhook() {
    return await this._request_get(`deleteWebhook`);
  }

  private async _request(apiName: string, payload: Record<string, any>) {
    return await fetch(
      `https://api.telegram.org/bot${this.token}/${apiName}`,
      payload,
    );
  }
  private async _request_get(apiName: string) {
    return await this._request(apiName, {
      method: 'GET',
    });
  }
  private async _request_post(apiName: string, payload: Record<string, any>) {
    return await this._request(apiName, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  }
}
