import React, { FC, useEffect, useState } from 'react';

import { Card, List, Row, Space, Spin, Typography } from 'antd';

import { InterfaceLabels } from '@/constants';

import styles from '../Payment.module.scss';

import { GlobalTicketType } from '@/dto/enums/GlobalTicketType';
import { GroupTariff } from '@/dto/payment/SeasonTicket';
import { useToken } from '@/hook/useToken';

interface PaymentDidBuyProps {
  instanceData: GroupTariff[] | undefined;
  loading: boolean;
  calculateKey: number;
}

export const PaymentDidBuy: FC<PaymentDidBuyProps> = ({ instanceData, loading, calculateKey }) => {
  const { payload } = useToken();
  const storePrefix = payload?.email || '';

  const [savedTarifs, setSavedTarifs] = useState<GroupTariff[]>([]);

  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem('selectedTarifsIds' + storePrefix) || '[]');
    const savedTrener = JSON.parse(localStorage.getItem('isTrenerSelected' + storePrefix) || '{}');
    const reconstructed = instanceData?.map((el) => ({
      ...el,
      tariffs: el.tariffs.filter(({ id }) => savedIds.includes(id)),
      trenerPrice: savedTrener[el.type] ? el.trenerPrice : 0,
    }));
    const isAnyTariffs = reconstructed?.some((el) => el.tariffs.length);
    if (isAnyTariffs && reconstructed) setSavedTarifs(reconstructed);
  }, [calculateKey, instanceData]);

  return (
    <Spin spinning={!!savedTarifs.length && loading}>
      {!!savedTarifs.length && (
        <div className={styles.paymentDidBuy}>
          <Row justify={'center'} className={styles.paymentDidBuyTitle}>
            <Typography.Title level={3}>{InterfaceLabels.PP_DID_BUY_TITLE}</Typography.Title>
          </Row>
          <Card>
            {savedTarifs.length > 0 && (
              <List
                itemLayout="horizontal"
                size="large"
                dataSource={savedTarifs}
                renderItem={({ type, tariffs, trenerPrice }) =>
                  tariffs.map((tariff, index) => (
                    <List.Item key={tariff.id}>
                      <List.Item.Meta
                        title={
                          <Typography.Text>{GlobalTicketType[type as keyof typeof GlobalTicketType]}</Typography.Text>
                        }
                        description={`${tariff.name} — ${InterfaceLabels.FROM_TO[0]} ${tariff.time[0]} ${InterfaceLabels.FROM_TO[1]} ${tariff.time[1]}`}
                      />
                      {!!trenerPrice && index === 0 && <Space>{InterfaceLabels.PP_DID_BUY_TRENER}</Space>}
                    </List.Item>
                  ))
                }
              />
            )}
          </Card>
        </div>
      )}
    </Spin>
  );
};
