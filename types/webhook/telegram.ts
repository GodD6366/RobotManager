export type TTelegramBotWebhookMessage = {
  update_id: number;
  message: {
    message_id: number;
    from: {
      /**
       * 用户ID
       */
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
      language_code: string;
    };
    chat: {
      /**
       * 频道ID
       */
      id: number;
      title: string;
      type: string;
      all_members_are_administrators: boolean;
    };
    date: Date;
    reply_to_message?: {
      message_id: number;
      date: Date;
      text: string;
    };
    text: string;
  };
};
