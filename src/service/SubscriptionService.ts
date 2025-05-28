import { AxiosResponse } from 'axios';

import instance from './axios';
import { SeasonTicket } from '@/dto/payment/SeasonTicket';

export const getAllTickets = (): Promise<AxiosResponse<SeasonTicket[]>> => {
  return instance.get<SeasonTicket[]>(`/subscription`);
};
