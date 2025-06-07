import { create } from 'zustand';

import { showError } from '@/utils';

import { Training } from '@/dto/training/Training';
import { TrainingService } from '@/service';
import { MessageService } from '@/service/MessageService';

type Store = {
  loading: boolean;
  updateNeeded: boolean;
  trainingData: Training[];
  getAllTraining: () => void;
  addTraining: (data: Training) => Promise<void>;

  modalOpen: boolean;
  setModalOpen: (l: boolean) => void;
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
  addTraining: (data) =>
    new Promise((res, rej) => {
      set(() => ({ loading: true }));
      TrainingService.addTraining(data)
        .then(() => {
          set(() => ({ modalOpen: false, updateNeeded: true, loading: false }));
          MessageService.success();
          res();
        })
        .catch((e) => {
          showError(e);
          set(() => ({ loading: false }));
          rej();
        });
    }),

  modalOpen: false,
  setModalOpen: (value) => set(() => ({ modalOpen: value })),
}));
