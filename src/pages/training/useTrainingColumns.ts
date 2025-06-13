import { useMemo } from 'react';

import { InterfaceLabels } from '@/constants';
import { mapDate } from '@/utils/FormUtils';

import { HollNames, HollNamesKeys } from '@/dto/enums/HollNames';
import { Person } from '@/dto/person/Person';
import { Training } from '@/dto/training/Training';

export const useTrainingColumns = (trainers: Person[], isManager: boolean) =>
  useMemo(() => {
    const columns = [
      {
        title: InterfaceLabels.TLP_COLUMNS.date,
        dataIndex: 'date',
        key: 'date',
        render: (value: string) => mapDate(value),
        sorter: (a: Training, b: Training) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      },
      { title: InterfaceLabels.TLP_COLUMNS.time, dataIndex: 'time', key: 'time' },
      {
        title: InterfaceLabels.TLP_COLUMNS.type,
        dataIndex: 'type',
        key: 'type',
        render: (value: keyof typeof InterfaceLabels.TLP_TYPE_VALUES) =>
          isManager ? InterfaceLabels.TLP_TYPE_VALUES_ADMIN[value] : InterfaceLabels.TLP_TYPE_VALUES[value],
      },
      {
        title: InterfaceLabels.TLP_COLUMNS.trainer,
        dataIndex: 'trainerId',
        key: 'trainerId',
        render: (value: number) => {
          const person = trainers?.find((el) => el.id === value);
          return `${person?.firstName || '||'} ${person?.middleName || ''}`.trim();
        },
      },
      {
        title: InterfaceLabels.TLP_COLUMNS.holl,
        dataIndex: 'holl',
        key: 'holl',
        render: (value: HollNamesKeys) => HollNames[value],
      },
    ];
    return columns;
  }, [trainers, isManager]);
