import { GlobalTicketType } from '../enums/GlobalTicketType';

export interface Training {
  date: string;
  time: string;
  type: 'private' | 'group';
  belongsId?: string;
  trainerId: number;
  holl: GlobalTicketType;
}
