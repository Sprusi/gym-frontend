import { v4 as uuidv4 } from 'uuid';

export interface GroupTariff {
  type: GlobalTariffType;
  title: string;
  tariffs: GroupTariffData[];
  trenerPrice: number;
}
export interface GroupTariffData {
  name: string;
  time: string[];
  price: number;
  uuid: string;
}

export enum GlobalTariffType {
  girl = 'girl',
  boy = 'boy',
  children = 'children',
}

interface Tariffs {
  uuid: string;
  globalType: GlobalTariffType;
  type: 'morning' | 'afternoon' | 'evening';
  timeStart: string;
  timeEnd: string;
  price: number;
  trainerPrice: number;
}

export const NEW_ALL_TARIFS: Tariffs[] = [
  {
    uuid: uuidv4(),
    globalType: 'girl' as GlobalTariffType,
    type: 'morning',
    timeStart: '8:00',
    timeEnd: '12:00',
    price: 1800,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'girl' as GlobalTariffType,
    type: 'afternoon',
    timeStart: '12:00',
    timeEnd: '16:30',
    price: 2000,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'girl' as GlobalTariffType,
    type: 'evening',
    timeStart: '17:00',
    timeEnd: '21:00',
    price: 2200,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'boy' as GlobalTariffType,
    type: 'morning',
    timeStart: '8:00',
    timeEnd: '12:00',
    price: 2000,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'boy' as GlobalTariffType,
    type: 'afternoon',
    timeStart: '12:00',
    timeEnd: '16:30',
    price: 2200,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'boy' as GlobalTariffType,
    type: 'evening',
    timeStart: '17:00',
    timeEnd: '21:00',
    price: 2500,
    trainerPrice: 4000,
  },
  {
    uuid: uuidv4(),
    globalType: 'children' as GlobalTariffType,
    type: 'morning',
    timeStart: '8:00',
    timeEnd: '12:00',
    price: 2000,
    trainerPrice: 4500,
  },
  {
    uuid: uuidv4(),
    globalType: 'children' as GlobalTariffType,
    type: 'afternoon',
    timeStart: '12:00',
    timeEnd: '16:30',
    price: 2200,
    trainerPrice: 4500,
  },
  {
    uuid: uuidv4(),
    globalType: 'children' as GlobalTariffType,
    type: 'evening',
    timeStart: '17:00',
    timeEnd: '21:00',
    price: 2500,
    trainerPrice: 4500,
  },
];
