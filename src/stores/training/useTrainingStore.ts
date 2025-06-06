import { create } from 'zustand';

import { showError } from '@/utils';

import { Training } from '@/dto/training/Training';
import { TrainingService } from '@/service';

type Store = {
  loading: boolean;
  updateNeeded: boolean;
  trainingData: Training[];
  getAllTraining: () => void;
};

export const useTrainingStore = create<Store>()((set, get) => ({
  loading: false,
  updateNeeded: true,
  trainingData: [],
  getAllTraining: () => {
    if (get().loading) return;
    set(() => ({ loading: true }));
    TrainingService.getTrainingForUser()
      .then(({ data }) => set(() => ({ trainingData: data })))
      .catch(showError)
      .finally(() => set(() => ({ loading: false, updateNeeded: false })));
  },
}));
