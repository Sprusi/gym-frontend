import { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { getDto } from './utils';
import { localStorageAuth } from '@/utils';

import { Training } from '@/dto/training/Training';

const getAllTrainingPrefix = () => 'allTrainingData';

export const getAllTraining = (): Promise<AxiosResponse<Training[]>> => {
  return new Promise((res) => {
    const dto = getDto<Training[]>(JSON.parse(localStorage.getItem(getAllTrainingPrefix()) || '[]'));
    res(dto);
  });
};

export const getTrainingForUser = async (): Promise<AxiosResponse<Training[]>> => {
  const userId = localStorageAuth.getCurrentToken()?.payload?.id || null;
  if (!userId) throw getDto(undefined, 401);

  const allData = (await getAllTraining()).data;
  const filteredData = allData.filter(
    (el) => el.type === 'group' || (el.type === 'private' && el.belongsId && el.belongsId === userId)
  );
  return getDto<Training[]>(filteredData);
};

export const addTraining = async (data: Training): Promise<AxiosResponse<void>> => {
  const prevData = (await getAllTraining()).data;
  localStorage.setItem(getAllTrainingPrefix(), JSON.stringify([...prevData, { ...data, id: uuidv4() }]));
  return getDto();
};
