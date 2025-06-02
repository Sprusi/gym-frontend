import React, { useEffect } from 'react';

import { Card, Space, Table } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import EditModal from './edit-modal/EditModal';
import TrainerModal from './trainer-modal/TrainerModal';
import { usePaymentListColumns } from './usePaymentListColumns';
import { usePaymentStore } from '@/stores/payment/usePaymentStore';

export const PaymentList = () => {
  const { loading, ticketsData, getTickets, setTrainerModalOpen, setEditModalOpen } = usePaymentStore();
  useEffect(() => getTickets(), []);

  const columns = usePaymentListColumns();
  const handleTrainerPrice = () => setTrainerModalOpen(true);

  return (
    <Card
      title={InterfaceLabels.PLP_TITLE}
      extra={
        <Space>
          <ButtonCustomed disabled={loading} onClick={handleTrainerPrice}>
            {InterfaceLabels.PLP_SET_PRICE_TREINER}
          </ButtonCustomed>
          <ButtonCustomed disabled={loading} onClick={() => setEditModalOpen(true)}>
            {InterfaceLabels.PLP_TARIFF_ADDED}
          </ButtonCustomed>
        </Space>
      }
    >
      <Table columns={columns} dataSource={ticketsData} bordered loading={loading} rowKey={'id'} />
      <EditModal />
      <TrainerModal />
    </Card>
  );
};
