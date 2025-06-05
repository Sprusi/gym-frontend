import { SexTypes } from './SexTypes';

export interface Person {
  id: 1;
  email: string;
  phone: string;
  firstName: string;
  middleName: string;
  lastName: string;
  roles: string[];
  sex: SexTypes;
  height: number;
  weight: number;
  age: number;
  kalNorm: number;
  avatar: string;
}
