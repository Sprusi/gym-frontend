import { AxiosResponse } from 'axios';

import instance from './axios';
import { SeasonTicket } from '@/dto/payment/SeasonTicket';

export const getAllTickets = (): Promise<AxiosResponse<SeasonTicket[]>> => {
  return instance.get<SeasonTicket[]>(`/subscription`);
};

export const setTrainerPrice = (
  data: Pick<SeasonTicket, 'globalType' | 'trainerPrice'>
): Promise<AxiosResponse<void>> => {
  return instance.put<void>('subscription/setPrice', data);
};
