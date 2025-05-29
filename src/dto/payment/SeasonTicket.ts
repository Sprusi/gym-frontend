import { GlobalTicketTypeKeys } from '../enums/GlobalTicketType';

export interface SeasonTicket {
  id: number;
  globalType: GlobalTicketTypeKeys;
  type: 'morning' | 'afternoon' | 'evening';
  timeStart: string;
  timeEnd: string;
  price: number;
  trainerPrice: number;
}

export interface GroupTariff {
  type: GlobalTicketTypeKeys;
  title: string;
  tariffs: GroupTariffData[];
  trenerPrice: number;
}
export interface GroupTariffData {
  name: string;
  time: string[];
  price: number;
  id: number;
}
