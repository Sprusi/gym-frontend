import { localStorageAuth } from './localStorageAuth';
import { TokenRoles } from '@/dto/enums/TokenRoles';
import { useHasRole } from '@/hook/useHasRole';

export const hasAccess = (path: string): boolean => {
  const { isUser, isManager } = useHasRole();

  switch (path) {
    case 'payment-profile':
      return isUser || isManager;
    case 'payment-list':
      return isManager;

    default:
      return false;
  }
};

export const getDefaultPath = (): string => {
  const { token, payload } = localStorageAuth.getCurrentToken() || {};
  const isAuthenticated = !!token?.accessToken && !!payload?.roles;

  const isManager = !!payload?.roles.includes(TokenRoles.MANAGER);
  const isUser = !!payload?.roles.includes(TokenRoles.USER);
  const isTrainer = !!payload?.roles.includes(TokenRoles.TRAINER);

  if (isAuthenticated) {
    if (isTrainer) return '/';
    else if (isUser || isManager) return '/gym/payment-profile';
  }

  return process.env.REACT_APP_DEFAULT_ROUTE_PATH || '/';
};
