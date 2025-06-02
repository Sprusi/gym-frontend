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
  return process.env.REACT_APP_DEFAULT_ROUTE_PATH || '/';
};
