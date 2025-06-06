import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { getDto, getPersonPrefix } from './utils';

import { Achievement } from '@/dto/achievements/Achievement';

export const getAllAchievements = (): Promise<AxiosResponse<Achievement[]>> => {
  return new Promise((res) => {
    const dto = getDto<Achievement>(JSON.parse(localStorage.getItem('achievements' + getPersonPrefix()) || '[]'));
    res(dto);
  });
};

export const addAchievements = async (data: Achievement): Promise<AxiosResponse<void>> => {
  const prevData = (await getAllAchievements()).data;
  localStorage.setItem('achievements' + getPersonPrefix(), JSON.stringify([...prevData, { ...data, id: uuidv4() }]));
  return getDto();
};

export const deleteAchievementsById = async (id: number): Promise<AxiosResponse<void>> => {
  const prevData = (await getAllAchievements()).data;
  const newData = prevData.filter((el) => el.id != id);
  localStorage.setItem('achievements' + getPersonPrefix(), JSON.stringify(newData));
  return getDto();
};
