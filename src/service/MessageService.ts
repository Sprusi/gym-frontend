import { message } from 'antd';

import { InterfaceLabels } from '@/constants';

export class MessageService {
  static success(text = InterfaceLabels.SUCCESS) {
    message.success(text);
  }

  static warn(text = InterfaceLabels.ERR_DEFAULT) {
    message.warning(text);
  }

  private static errorDisplayed = false;
  public static error(text = InterfaceLabels.ERR_DEFAULT, error?: Error) {
    console.error(error);
    if (this.errorDisplayed) return;

    this.errorDisplayed = true;
    const messageContent = typeof text === 'string' ? text : InterfaceLabels.ERR_DEFAULT;
    message.error({ content: messageContent, duration: 7 });
    setTimeout(() => {
      this.errorDisplayed = false;
    }, 3000);
  }
}
