import { create } from 'zustand';

import { mappedData } from '@/pages/achievements/utils';

import { showError } from '@/utils';

import { Achievement } from '@/dto/achievements/Achievement';
import { AchievementsService } from '@/service';
import { MessageService } from '@/service/MessageService';

type Store = {
  loading: boolean;
  updateNeeded: boolean;
  achievement: Achievement[];
  getAllAchievements: () => void;
  addAchievement: (data: Achievement) => void;
  deleteAchievement: (id: number) => void;

  modalOpen: boolean;
  setModalOpen: (l: boolean) => void;
  record: Achievement | undefined;
};

export const useAchievementsStore = create<Store>()((set) => ({
  loading: false,
  updateNeeded: true,
  achievement: [],
  getAllAchievements: () => {
    set(() => ({ loading: true }));
    AchievementsService.getAllAchievements()
      .then(({ data }) => set(() => ({ achievement: mappedData(data) })))
      .catch(showError)
      .finally(() => set(() => ({ loading: false, updateNeeded: false })));
  },
  addAchievement: async (data) =>
    new Promise((res, rej) => {
      set(() => ({ loading: true }));
      AchievementsService.addAchievements(data)
        .then(() => {
          set(() => ({ modalOpen: false }));
          MessageService.success();
          set(() => ({ updateNeeded: true }));
          res();
        })
        .catch((e) => {
          showError(e);
          rej();
        })
        .finally(() => set(() => ({ loading: false })));
    }),
  deleteAchievement: async (id) =>
    new Promise((res, rej) => {
      set(() => ({ loading: true }));
      AchievementsService.deleteAchievementsById(id)
        .then(() => {
          MessageService.success();
          set(() => ({ updateNeeded: true }));
          res();
        })
        .catch((e) => {
          showError(e);
          rej();
        })
        .finally(() => set(() => ({ loading: false })));
    }),

  modalOpen: false,
  setModalOpen: (value) => set(() => ({ modalOpen: value })),
  record: undefined,
}));
