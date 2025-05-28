import axios, { AxiosError, AxiosResponse } from 'axios';

import { InterfaceLabels } from '@/constants';

import { getBaseUrl } from './axios';
import { MessageService } from './MessageService';
import { TokenResponse } from '@/dto/TokenResponse';

const authInstance = axios.create({
  baseURL: getBaseUrl(),
});

const refreshToken = (refreshToken: string | undefined): Promise<AxiosResponse<TokenResponse>> => {
  return authInstance.post<TokenResponse>('/auth/refresh', { refreshToken });
};

authInstance.interceptors.response.use(
  (v) => v,
  (error: AxiosError) => {
    if (error.response?.status === 400) {
      MessageService.error(InterfaceLabels.SERVER_REQUEST_ERROR, error);
    } else if (error.response?.status === 401) {
      MessageService.error(InterfaceLabels.LOGIN_ERROR, error);
    } else if (error.response?.status === 403) {
      MessageService.error(InterfaceLabels.ACCESS_DENIED, error);
    } else {
      MessageService.error(InterfaceLabels.NO_CONNECTION_TO_SERVER, error);
    }
    return Promise.reject(error);
  }
);

export const AuthService = {
  refreshToken,
};
