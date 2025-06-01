import { create } from 'zustand';

import { InterfaceLabels } from '@/constants';
import { showError } from '@/utils';

import { SeasonTicket } from '@/dto/payment/SeasonTicket';
import { SubscriptionService } from '@/service';
import { MessageService } from '@/service/MessageService';

type Store = {
  loading: boolean;
  ticketsData: SeasonTicket[];
  getTickets: () => void;
  deleteTicket: (id: number) => void;

  editModalOpen: boolean;
  setEditModalOpen: (l: boolean) => void;
  record: SeasonTicket | undefined;
  setRecord: (l: SeasonTicket) => void;
  createTicket: (data: SeasonTicket) => Promise<void>;
  editTicket: (id: number | undefined, data: SeasonTicket) => Promise<void>;

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
  deleteTicket: (id) => {
    set(() => ({ loading: true }));
    SubscriptionService.deleteTicketsById(id)
      .then(() => {
        MessageService.success();
        get().getTickets();
      })
      .catch(showError)
      .finally(() => set(() => ({ loading: false })));
  },

  editModalOpen: false,
  setEditModalOpen: (value) => set(() => ({ editModalOpen: value })),
  record: undefined,
  setRecord: (record) => set(() => ({ record })),
  createTicket: async (data) =>
    new Promise((res, rej) => {
      set(() => ({ loading: true }));
      SubscriptionService.createTicket(data)
        .then(() => {
          set(() => ({ editModalOpen: false }));
          MessageService.success();
          get().getTickets();
          res();
        })
        .catch((e) => {
          showError(e);
          rej();
        })
        .finally(() => set(() => ({ loading: false })));
    }),
  editTicket: async (id, data) =>
    new Promise((res, rej) => {
      if (!id) return MessageService.warn(InterfaceLabels.NOT_ID);
      set(() => ({ loading: true }));
      SubscriptionService.editTicketById(id, data)
        .then(() => {
          set(() => ({ editModalOpen: false }));
          MessageService.success();
          get().getTickets();
          res();
        })
        .catch((e) => {
          showError(e);
          rej();
        })
        .finally(() => set(() => ({ loading: false })));
    }),

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
