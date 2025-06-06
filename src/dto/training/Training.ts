export interface Training {
  date: string;
  time: string;
  type: 'private' | 'group';
  belongsId?: string;
  trainer: string;
  holl: string;
}
