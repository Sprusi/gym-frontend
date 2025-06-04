import React, { useMemo } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils';

import { GroupTariffData } from '@/dto/payment/SeasonTicket';
import { useHasRole } from '@/hook/useHasRole';
import { useToken } from '@/hook/useToken';

export const usePaymentColumns = (
  selectedTarifsIds: number[],
  setSelectedTarifsIds: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const { isManager } = useHasRole();
  const { payload } = useToken();
  const storePrefix = payload?.email || '';
  const tariffsDidBuy = !!JSON.parse(localStorage.getItem('selectedTarifsIds' + storePrefix) || '[]').length;

  const isActionDisabled = tariffsDidBuy && !isManager;

  const columns = useMemo(() => {
    const mainColumns = [
      { key: 'name', dataIndex: 'name', title: InterfaceLabels.PP_COLUMNS.name },
      {
        key: 'time',
        dataIndex: 'time',
        title: InterfaceLabels.PP_COLUMNS.time,
        render: (time: string[]) => `${InterfaceLabels.FROM_TO[0]} ${time[0]} ${InterfaceLabels.FROM_TO[1]} ${time[1]}`,
      },
      {
        key: 'price',
        dataIndex: 'price',
        title: InterfaceLabels.PP_COLUMNS.price,
        render: (price: string) => formatAmountToLookGood(price) + ` ${InterfaceLabels.RUB}`,
      },
    ];
    const actionColumns = [
      {
        key: 'actions',
        dataIndex: 'actions',
        render: (_: string, { id }: GroupTariffData) => (
          <ButtonCustomed
            icon={<PlusOutlined />}
            disabled={selectedTarifsIds.includes(id)}
            onClick={() => setSelectedTarifsIds((prev) => [...prev, id])}
          />
        ),
        width: 50,
      },
    ];
    return isActionDisabled ? mainColumns : [...mainColumns, ...actionColumns];
  }, [selectedTarifsIds, tariffsDidBuy]);

  return columns;
};
