import { Key, useMemo } from 'react';

import { Badge, Tag } from 'antd';

import { getGlobalTypeColor } from './utils';
import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils';

import ActionColumnRender from './action-column/ActionColumnRender';
import styles from './PaymentList.module.scss';
import { GlobalTicketType, GlobalTicketTypeKeys } from '@/dto/enums/GlobalTicketType';
import { TicketType, TicketTypeKeys } from '@/dto/enums/TicketsType';
import { SeasonTicket } from '@/dto/payment/SeasonTicket';

export const usePaymentListColumns = () =>
  useMemo(() => {
    const globalTypeFilters = Object.keys(GlobalTicketType).map((value) => ({
      value,
      text: GlobalTicketType[value as keyof typeof GlobalTicketType],
    }));

    const typeFilters = Object.keys(TicketType).map((value) => ({
      value,
      text: TicketType[value as keyof typeof TicketType],
    }));

    const columns = [
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (_: string, record: SeasonTicket) => <ActionColumnRender record={record} />,
        width: 80,
        align: 'center' as const,
      },
      {
        title: InterfaceLabels.PLP_COLUMNS.globalType,
        dataIndex: 'globalType',
        key: 'globalType',
        render: (type: GlobalTicketTypeKeys) => (
          <Badge color={getGlobalTypeColor(type)} text={GlobalTicketType[type] || type} />
        ),
        align: 'center' as const,
        filters: globalTypeFilters,
        onFilter: (value: Key | boolean, record: SeasonTicket) => record.globalType === value,
      },
      {
        title: InterfaceLabels.PLP_COLUMNS.type,
        dataIndex: 'type',
        key: 'type',
        filters: typeFilters,
        render: (type: TicketTypeKeys) => <Tag className={styles.columnsType}>{TicketType[type] || type}</Tag>,
        onFilter: (value: Key | boolean, record: SeasonTicket) => record.type === value,
        align: 'center' as const,
      },
      {
        title: InterfaceLabels.PLP_COLUMNS.time,
        dataIndex: 'time',
        key: 'time',
        render: (_: string, record: SeasonTicket) =>
          `${InterfaceLabels.FROM_TO[0]} ${record.timeStart} ${InterfaceLabels.FROM_TO[1]} ${record.timeEnd}`,
      },
      {
        title: InterfaceLabels.PLP_COLUMNS.price,
        dataIndex: 'price',
        key: 'price',
        render: (value: string) => formatAmountToLookGood(value),
        sorter: (a: SeasonTicket, b: SeasonTicket) => a.price - b.price,
      },
      {
        title: InterfaceLabels.PLP_COLUMNS.trainerPrice,
        dataIndex: 'trainerPrice',
        key: 'trainerPrice',
        render: (value: string) => formatAmountToLookGood(value),
        sorter: (a: SeasonTicket, b: SeasonTicket) => a.trainerPrice - b.trainerPrice,
      },
    ];

    return columns;
  }, []);
