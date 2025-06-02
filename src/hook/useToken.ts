import { useMemo } from 'react';

import { localStorageAuth } from '@/utils';

export const useToken = () => {
  const { token, payload } = localStorageAuth.getCurrentToken() || {};
  const isAuthenticated = useMemo(() => !!token?.accessToken && !!payload?.roles, [token, payload]);

  return { token, payload, isAuthenticated };
};
