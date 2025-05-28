import { TokenPayload } from './TokenPayload';
import { TokenResponse } from './TokenResponse';

export interface Token {
  token: TokenResponse;
  payload: TokenPayload;
}
