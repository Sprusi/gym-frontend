import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { InterfaceLabels } from '@/constants';
import { localStorageAuth } from '@/utils/localStorageAuth';

import { AuthService } from './AuthService';
import { MessageService } from './MessageService';

export function getBaseUrl(): string {
  return process.env.REACT_APP_BASE_URL || 'http://localhost:5001';
}

const instance = axios.create({ baseURL: getBaseUrl() });

instance.interceptors.request.use((config) => {
  const token = localStorageAuth.getCurrentToken()?.token?.accessToken;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

const handleError = async (error: AxiosError) => {
  const { config, response } = error;
  const status = response?.status;

  const isRetry = (config as any)._retry;
  switch (status) {
    case 400:
      MessageService.error(InterfaceLabels.REQUEST_ERROR + ': ' + JSON.stringify(response?.data, null, 2), error);
      break;
    case 401:
      if (!isRetry) {
        (config as any)._retry = true;
        try {
          const refreshToken = localStorageAuth.getCurrentToken()?.token?.refreshToken;
          const rs = await AuthService.refreshToken(refreshToken);
          localStorageAuth.setCurrentToken(rs.data);
          return instance(config as AxiosRequestConfig);
        } catch (refreshError) {
          MessageService.error(InterfaceLabels.INACTIVE_SESSION, refreshError as Error);
          setTimeout(() => localStorageAuth.clearAllAuthData(), 500);
        }
      } else {
        MessageService.error(InterfaceLabels.INACTIVE_SESSION, error);
        setTimeout(() => localStorageAuth.clearAllAuthData(), 500);
      }
      break;
    case 403:
      MessageService.error(InterfaceLabels.ACCESS_DENIED, error);
      // TODO: Навигейт на 403 экран
      // window.location.replace(errorPath(error.response.status));
      window.location.replace('/');
      break;
    case 404:
      MessageService.error(InterfaceLabels.PAGE_NOT_FOUND, error);
      break;
    case 500:
    case 501:
    case 502:
    case 503:
      MessageService.error(InterfaceLabels.NO_CONNECTION_TO_SERVER, error);
      break;
    default:
      MessageService.error(InterfaceLabels.ERR_DEFAULT, error);
  }

  return Promise.reject(error);
};

instance.interceptors.response.use((res) => res, handleError);

export default instance;
