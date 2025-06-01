import React, { FC, memo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Flex, Popconfirm } from 'antd';

import { InterfaceLabels } from '@/constants';

import { SeasonTicket } from '@/dto/payment/SeasonTicket';
import { usePaymentStore } from '@/stores/payment/usePaymentStore';

interface ActionColumnRenderProps {
  record: SeasonTicket;
}

const ActionColumnRender: FC<ActionColumnRenderProps> = ({ record }) => {
  const { setEditModalOpen, setRecord, deleteTicket } = usePaymentStore();

  return (
    <Flex justify="space-between">
      <Popconfirm title={InterfaceLabels.REALLY_DELETE} onConfirm={() => deleteTicket(record.id)}>
        <DeleteOutlined />
      </Popconfirm>
      <EditOutlined
        onClick={() => {
          setRecord(record);
          setEditModalOpen(true);
        }}
      />
    </Flex>
  );
};

export default memo(ActionColumnRender);
