import { GlobalTicketTypeKeys } from '@/dto/enums/GlobalTicketType';

export const getGlobalTypeColor = (type: GlobalTicketTypeKeys) => {
  switch (type) {
    case GlobalTicketTypeKeys.boy:
      return 'red';
    case GlobalTicketTypeKeys.girl:
      return 'orange';
    case GlobalTicketTypeKeys.children:
      return 'yellow';
  }
};
