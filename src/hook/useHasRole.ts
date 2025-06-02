import { useToken } from './useToken';
import { TokenRoles } from '@/dto/enums/TokenRoles';

export const useHasRole = () => {
  const { payload } = useToken();
  const isManager = !!payload?.roles.includes(TokenRoles.MANAGER);
  const isUser = !!payload?.roles.includes(TokenRoles.USER);
  const isTrainer = !!payload?.roles.includes(TokenRoles.TRAINER);

  return {
    isManager,
    isUser,
    isTrainer,
  };
};
