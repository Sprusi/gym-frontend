import { create } from 'zustand';

import { showError } from '@/utils';

import { TokenRoles } from '@/dto/enums/TokenRoles';
import { Person } from '@/dto/person/Person';
import { Training } from '@/dto/training/Training';
import { ProfileService, TrainingService } from '@/service';
import { MessageService } from '@/service/MessageService';

type Store = {
  loading: boolean;
  updateNeeded: boolean;

  trainingData: Training[];
  allTrainingData: Training[];
  trainers: Person[];

  getTraining: () => void;
  getAllTraining: () => void;
  getTrainers: () => void;
  addTraining: (data: Training) => Promise<void>;

  modalOpen: boolean;
  setModalOpen: (l: boolean) => void;
};

export const useTrainingStore = create<Store>()((set, get) => ({
  loading: false,
  updateNeeded: true,

  trainingData: [],
  allTrainingData: [],
  trainers: [],

  getTraining: () => {
    if (get().loading) return;
    set(() => ({ loading: true }));
    TrainingService.getTrainingForUser()
      .then(({ data }) => set(() => ({ trainingData: data })))
      .catch(showError)
      .finally(() => set(() => ({ loading: false, updateNeeded: false })));
  },
  getAllTraining: () => {
    TrainingService.getAllTraining()
      .then(({ data }) => set(() => ({ allTrainingData: data })))
      .catch(showError);
  },
  getTrainers: () => {
    if (get().trainers.length) return;
    ProfileService.getAllUsers()
      .then(({ data }) => set(() => ({ trainers: data.filter((el) => el.roles.includes(TokenRoles.TRAINER)) })))
      .catch(showError);
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
