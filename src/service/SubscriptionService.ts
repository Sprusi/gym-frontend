import { AxiosResponse } from 'axios';

import instance from './axios';
import { SeasonTicket } from '@/dto/payment/SeasonTicket';

export const getAllTickets = (): Promise<AxiosResponse<SeasonTicket[]>> => {
  return instance.get<SeasonTicket[]>(`/subscription`);
};

export const createTicket = (data: SeasonTicket): Promise<AxiosResponse<SeasonTicket>> => {
  return instance.post<SeasonTicket>('/subscription', data);
};

export const editTicketById = (id: number, data: SeasonTicket): Promise<AxiosResponse<SeasonTicket>> => {
  return instance.patch<SeasonTicket>(`/subscription/${id}`, data);
};

export const deleteTicketsById = (id: number): Promise<AxiosResponse<void>> => {
  return instance.delete<void>(`/subscription/${id}`);
};

export const setTrainerPrice = (
  data: Pick<SeasonTicket, 'globalType' | 'trainerPrice'>
): Promise<AxiosResponse<void>> => {
  return instance.put<void>('/subscription/setPrice', data);
};
