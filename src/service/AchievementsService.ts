import { AxiosResponse } from 'axios';

import { localStorageAuth } from '@/utils';

import { Achievement } from '@/dto/achievements/Achievement';

const getPrefix = () => {
  const { payload } = localStorageAuth.getCurrentToken() || {};
  return payload?.email || '';
};

const getDto = <T extends object>(data?: T) =>
  ({
    data,
    status: 200,
    statusText: 'good',
  } as AxiosResponse);

export const getAllAchievements = (): Promise<AxiosResponse<Achievement[]>> => {
  return new Promise((res) => {
    const dto = getDto<Achievement>(JSON.parse(localStorage.getItem('achievements' + getPrefix()) || '[]'));
    res(dto);
  });
};

export const addAchievements = async (data: Achievement): Promise<AxiosResponse<void>> => {
  const prevData = (await getAllAchievements()).data;
  localStorage.setItem('achievements' + getPrefix(), JSON.stringify([...prevData, data]));
  return getDto();
};
