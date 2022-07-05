export type TTelegramBotWebhookMessage_chat = {
  /**
   * 频道ID
   */
  id: number;
  title: string;
  type: string;
  all_members_are_administrators: boolean;
};

export type TTelegramBotWebhookMessage_form = {
  /**
   * 用户ID
   */
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
};

export type TTelegramBotWebhookMessage_member = {
  status: string; // 'administrator';
  can_be_edited: boolean;
  can_manage_chat: boolean;
  can_change_info: boolean;
  can_delete_messages: boolean;
  can_invite_users: boolean;
  can_restrict_members: boolean;
  can_pin_messages: boolean;
  can_promote_members: boolean;
  can_manage_video_chats: boolean;
  is_anonymous: boolean;
  can_manage_voice_chats: boolean;
  custom_title: string; // 'J.A.R.V.I.S.';
};

export type TTelegramBotWebhookMessage = {
  update_id: number;
  message?: {
    message_id: number;
    from: TTelegramBotWebhookMessage_form;
    chat: TTelegramBotWebhookMessage_chat;
    date: Date;
    reply_to_message?: {
      message_id: number;
      date: Date;
      text: string;
    };
    text?: string;
    photo?: any;
    sticker?: {
      width: number;
      height: number;
      emoji: string;
      set_name: string;
      is_animated: boolean;
      is_video: boolean;
      thumb: unknown;
      file_id: string;
      file_unique_id: string;
      file_size: number;
    };
  };
  my_chat_member?: {
    from: TTelegramBotWebhookMessage_form;
    chat: TTelegramBotWebhookMessage_chat;
    date: 1656783107;
    old_chat_member: TTelegramBotWebhookMessage_member;
    new_chat_member: TTelegramBotWebhookMessage_member;
  };
};
