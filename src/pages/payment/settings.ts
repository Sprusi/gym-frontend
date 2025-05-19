import { v4 as uuidv4 } from 'uuid';

import { InterfaceLabels } from '@/constants';

export interface TariffType {
  type: 'girl' | 'boy' | 'children';
  title: string;
  tarifs: TariffData[];
  trenerPrice: string;
}

export interface TariffData {
  name: string;
  time: string[];
  price: number;
  uuid: string;
}

export const TARIFS_TYPE: TariffType[] = [
  {
    type: 'girl',
    title: InterfaceLabels.PP_TARIF_TITLES.girl,
    tarifs: [
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.morning, time: ['8:00', '12:00'], price: 1800, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.afternoon, time: ['12:00', '16:30'], price: 2000, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.evening, time: ['17:00', '21:00'], price: 2200, uuid: uuidv4() },
    ],
    trenerPrice: '4000',
  },
  {
    type: 'boy',
    title: InterfaceLabels.PP_TARIF_TITLES.boy,
    tarifs: [
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.morning, time: ['8:00', '12:00'], price: 2000, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.afternoon, time: ['12:00', '16:30'], price: 2200, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.evening, time: ['17:00', '21:00'], price: 2500, uuid: uuidv4() },
    ],
    trenerPrice: '4000',
  },
  {
    type: 'children',
    title: InterfaceLabels.PP_TARIF_TITLES.children,
    tarifs: [
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.morning, time: ['8:00', '12:00'], price: 2000, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.afternoon, time: ['12:00', '16:30'], price: 2200, uuid: uuidv4() },
      { name: InterfaceLabels.PP_TARIF_DAY_TYPES.evening, time: ['17:00', '21:00'], price: 2500, uuid: uuidv4() },
    ],
    trenerPrice: '4500',
  },
];
