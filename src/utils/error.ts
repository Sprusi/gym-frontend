import { MessageService } from '@/service/MessageService';

export const showError = (e: any) => {
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.join?.('\n') ||
    e?.message ||
    e?.message?.join?.('\n') ||
    String(e);
  MessageService.warn(msg);
};
