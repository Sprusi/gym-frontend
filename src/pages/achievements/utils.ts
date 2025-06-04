import { mapDate } from '@/utils/FormUtils';

import { Achievement } from '@/dto/achievements/Achievement';

export const mappedData = (items: Achievement[]) => items?.map((el) => ({ ...el, date: mapDate(el.date) || '' }));
