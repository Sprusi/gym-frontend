export interface SeasonTicket {
  id: number;
  globalType: GlobalTicketType;
  type: 'morning' | 'afternoon' | 'evening';
  timeStart: string;
  timeEnd: string;
  price: number;
  trainerPrice: number;
}

export enum GlobalTicketType {
  girl = 'girl',
  boy = 'boy',
  children = 'children',
}

export interface GroupTariff {
  type: GlobalTicketType;
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
