import { Rule } from 'antd/es/form';
import dayjs, { Dayjs } from 'dayjs';

import { Formats, InterfaceLabels } from '@/constants';

export const getRequiredRule = (required?: boolean): Rule => ({
  required: required ?? true,
  message: InterfaceLabels.REQUIRED_FIELD,
});

export const mapDate = (date?: Date | string, format?: (typeof Formats)[keyof typeof Formats]): string | undefined => {
  if (!date) {
    return '\n';
  }
  const result = parseDate(date);
  return result?.date.format(format || (result.dateTime ? Formats.DATE_TIME_VIEW : Formats.DATE_VIEW));
};

export const toDateWrapper = (date: Date | string, dateTime: boolean): DateWrapper => ({
  date: dayjs(date, dateTime ? Formats.DATE_TIME : Formats.DATE),
  dateTime,
});

export const parseDate = (date?: Date | string): DateWrapper | undefined => {
  if (typeof date === 'string') {
    return toDateWrapper(date, date.includes('T'));
  }
  return undefined;
};

export type DateWrapper = { date: Dayjs; dateTime: boolean };

export const getOptionsFromEnum = <T extends object>(enumObj: T) =>
  Object.keys(enumObj).map((key) => ({
    value: key,
    label: enumObj[key as keyof T],
  }));
