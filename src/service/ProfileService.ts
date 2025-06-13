import { AxiosResponse } from 'axios';

import instance from './axios';
import { Person } from '@/dto/person/Person';

export const getUserById = (id: string): Promise<AxiosResponse<Person>> => {
  return instance.get<Person>(`/users/${id}`);
};

export const getAllUsers = (): Promise<AxiosResponse<Person[]>> => {
  return instance.get<Person[]>(`/users`);
};
