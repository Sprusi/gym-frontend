import { AxiosResponse } from 'axios';

import { localStorageAuth } from '@/utils';

export const getPersonPrefix = () => {
  const { payload } = localStorageAuth.getCurrentToken() || {};
  return payload?.email || '';
};

export const getDto = <T extends object>(data?: T, status = 200) =>
  ({
    data,
    status,
    statusText: 'good',
  } as AxiosResponse);
