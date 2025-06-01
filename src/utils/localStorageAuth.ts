import { parseJwt } from './jwt';
import { Token, TokenPayload, TokenResponse } from '@/dto';
import { MessageService } from '@/service/MessageService';

const PREFIX = window.location.origin;
const TOKEN_KEY = `${PREFIX}_tokenUL`;
const PATH_KEY = `${PREFIX}_requestedPathUL`;

const getCurrentToken = (): Token | null => {
  const item = localStorage.getItem(TOKEN_KEY);
  return item ? (JSON.parse(item) as Token) : null;
};

const setCurrentToken = (tokenResponse: TokenResponse, additionalPayload?: TokenPayload): Token => {
  if (!tokenResponse.accessToken) {
    MessageService.error('Invalid token');
    throw new Error('Invalid token');
  }
  const payload = parseJwt(tokenResponse.accessToken) as TokenPayload;
  const token: Token = { token: tokenResponse, payload: { ...payload, ...additionalPayload } };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  return token;
};

const pushRequestedPath = (path: string) => {
  if (path) localStorage.setItem(PATH_KEY, path);
};

const popRequestedPath = (): string | undefined => {
  const path = localStorage.getItem(PATH_KEY);
  if (path) {
    localStorage.setItem(PATH_KEY, '');
    return path;
  }
  return undefined;
};

const clearAllAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PATH_KEY);
  window.location.replace('/login');
};

export const localStorageAuth = {
  getCurrentToken,
  setCurrentToken,
  pushRequestedPath,
  popRequestedPath,
  clearAllAuthData,
};
