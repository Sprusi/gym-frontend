import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row, Space, Spin, Table, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils/NumberUtils';

import styles from './Payment.module.scss';
import { SelectedDrawer } from './selected-drawer/SelectedDrawer';
import { GlobalTicketTypeKeys } from '@/dto/enums/GlobalTicketType';
import { GroupTariff, GroupTariffData } from '@/dto/payment/SeasonTicket';
import { usePaymentStore } from '@/stores/payment/usePaymentStore';

export const Payment = () => {
  const { type } = useParams();

  const initTrainerSelected = Object.keys(GlobalTicketTypeKeys).reduce((acc, item) => {
    return (acc[item] = false), acc;
  }, {} as Record<string, boolean>);
  const [isTrenerSelected, setIsTrenerSelected] = useState(initTrainerSelected);
  const [selectedTarifsIds, setSelectedTarifsIds] = useState<number[]>([]);

  const { loading, ticketsData, getTickets } = usePaymentStore();
  useEffect(() => getTickets(), []);

  const groupedTarifs = useMemo(
    () =>
      ticketsData.reduce((acc, curr) => {
        if (!acc[curr.globalType]) {
          acc[curr.globalType] = { tariffs: [], trainerPrice: curr.trainerPrice };
        }
        acc[curr.globalType].tariffs.push({
          name: InterfaceLabels.PP_TARIF_DAY_TYPES[curr.type],
          time: [curr.timeStart, curr.timeEnd],
          price: curr.price,
          id: curr.id,
        });

        return acc;
      }, {} as Record<GlobalTicketTypeKeys, { tariffs: GroupTariffData[]; trainerPrice: number }>),
    [ticketsData]
  );

  const formattedTarifs: GroupTariff[] = useMemo(
    () =>
      Object.entries(groupedTarifs).map(([type, data]) => ({
        type: GlobalTicketTypeKeys[type as keyof typeof GlobalTicketTypeKeys],
        title: InterfaceLabels.PP_TARIF_TITLES[type as keyof typeof GlobalTicketTypeKeys],
        tariffs: data.tariffs,
        trenerPrice: data.trainerPrice,
      })),
    [groupedTarifs]
  );

  const instanceData = useMemo(
    () =>
      formattedTarifs.sort((a, b) => {
        if (a.type === type) return -1;
        if (b.type === type) return 1;
        return 0;
      }),
    [formattedTarifs]
  );

  const columns = useMemo(
    () => [
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
    ],
    [selectedTarifsIds]
  );

  const toggleTrainer = (type: string) => setIsTrenerSelected((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <>
      <Row className={styles.wrapper} justify={'center'} align={'middle'}>
        <Col span={20}>
          <Row justify={'center'} className={styles.title}>
            <Typography.Title level={3}>{InterfaceLabels.PP_TITLE}</Typography.Title>
          </Row>
          <Spin spinning={loading}>
            <Carousel arrows>
              {instanceData.map(({ type, title, tariffs, trenerPrice }) => (
                <Card key={type}>
                  <div className={styles.cardWrapper}>
                    <Typography.Text strong>{title}</Typography.Text>
                    <Table
                      className={styles.cardTable}
                      bordered
                      pagination={false}
                      columns={columns}
                      dataSource={tariffs}
                      rowKey={(rec) => `${type} - ${rec.name}`}
                    />
                    <Space>
                      <Typography.Text>{InterfaceLabels.PP_TRENER}</Typography.Text>
                      <ButtonCustomed
                        type="transparent"
                        iconPosition={'end'}
                        icon={isTrenerSelected[type] && <CheckOutlined />}
                        disabled={isTrenerSelected[type]}
                        onClick={() => toggleTrainer(type)}
                      >
                        + {formatAmountToLookGood(trenerPrice)} {InterfaceLabels.RUB}
                      </ButtonCustomed>
                      {isTrenerSelected[type] && <CloseOutlined onClick={() => toggleTrainer(type)} />}
                    </Space>
                  </div>
                </Card>
              ))}
            </Carousel>
          </Spin>
        </Col>
      </Row>
      <SelectedDrawer
        selectedTarifsIds={selectedTarifsIds}
        setSelectedTarifsIds={setSelectedTarifsIds}
        initTrainerSelected={initTrainerSelected}
        isTrenerSelected={isTrenerSelected}
        setIsTrenerSelected={setIsTrenerSelected}
        instanceData={instanceData}
      />
    </>
  );
};
