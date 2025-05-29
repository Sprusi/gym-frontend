import { create } from 'zustand';

import { showError } from '@/utils';

import { SeasonTicket } from '@/dto/payment/SeasonTicket';
import { SubscriptionService } from '@/service';
import { MessageService } from '@/service/MessageService';

type Store = {
  loading: boolean;
  ticketsData: SeasonTicket[];
  getTickets: () => void;

  trainerModalOpen: boolean;
  setTrainerModalOpen: (l: boolean) => void;
  setTrainerPrice: (data: Pick<SeasonTicket, 'globalType' | 'trainerPrice'>) => Promise<void>;
};

export const usePaymentStore = create<Store>()((set, get) => ({
  loading: false,
  ticketsData: [],
  getTickets: () => {
    set(() => ({ loading: true }));
    SubscriptionService.getAllTickets()
      .then(({ data }) => set(() => ({ ticketsData: data })))
      .catch(showError)
      .finally(() => set(() => ({ loading: false })));
  },

  trainerModalOpen: false,
  setTrainerModalOpen: (value) => set(() => ({ trainerModalOpen: value })),
  setTrainerPrice: async (data) => {
    set(() => ({ loading: true }));
    SubscriptionService.setTrainerPrice(data)
      .then(() => {
        set(() => ({ trainerModalOpen: false }));
        MessageService.success();
        get().getTickets();
      })
      .catch(showError)
      .finally(() => set(() => ({ loading: false })));
  },
}));
