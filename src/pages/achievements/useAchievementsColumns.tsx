import React, { useMemo } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

import { InterfaceLabels } from '@/constants';

import { Achievement } from '@/dto/achievements/Achievement';

export const useAchievementsColumns = (handleDelete: (id: number) => void) =>
  useMemo(() => {
    const columns = [
      {
        dataIndex: 'action',
        key: 'action',
        render: (_: string, record: Achievement) => (
          <Popconfirm title={InterfaceLabels.REALLY_DELETE} onConfirm={() => handleDelete(record.id)}>
            <DeleteOutlined />
          </Popconfirm>
        ),
        align: 'center' as const,
      },
      {
        title: InterfaceLabels.AP_COLUMNS.date,
        dataIndex: 'date',
        key: 'date',
        sorter: (a: Achievement, b: Achievement) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      },
      {
        title: InterfaceLabels.AP_COLUMNS.calories,
        dataIndex: 'calories',
        key: 'calories',
        sorter: (a: Achievement, b: Achievement) => a.calories - b.calories,
      },
      {
        title: InterfaceLabels.AP_COLUMNS.group,
        dataIndex: 'group',
        key: 'group',
        sorter: (a: Achievement, b: Achievement) => a.group.localeCompare(b.group),
      },
      { title: InterfaceLabels.AP_COLUMNS.comment, dataIndex: 'comment', key: 'comment' },
    ];
    return columns;
  }, []);
