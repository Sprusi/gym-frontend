import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
  localStorage.setItem('achievements' + getPrefix(), JSON.stringify([...prevData, { ...data, id: uuidv4() }]));
  return getDto();
};

export const deleteAchievementsById = async (id: number): Promise<AxiosResponse<void>> => {
  const prevData = (await getAllAchievements()).data;
  const newData = prevData.filter((el) => el.id != id);
  localStorage.setItem('achievements' + getPrefix(), JSON.stringify(newData));
  return getDto();
};
