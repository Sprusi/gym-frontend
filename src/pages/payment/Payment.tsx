import React, { useMemo, useState } from 'react';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Carousel, Col, Row, Space, Table, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils/NumberUtils';

import styles from './Payment.module.scss';
import { SelectedDrawer } from './selected-drawer/SelectedDrawer';
import { TariffData, TARIFS_TYPE } from './settings';

export const Payment = () => {
  const initTrainerSelected = TARIFS_TYPE.reduce((acc, { type }) => {
    return (acc[type] = false), acc;
  }, {} as Record<string, boolean>);
  const [isTrenerSelected, setIsTrenerSelected] = useState(initTrainerSelected);
  const [selectedTarifsId, setSelectedTarifsId] = useState<string[]>([]);

  const toggleTrainer = (type: string) => setIsTrenerSelected((prev) => ({ ...prev, [type]: !prev[type] }));

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
        render: (_: string, { uuid }: TariffData) => (
          <ButtonCustomed
            icon={<PlusOutlined />}
            disabled={selectedTarifsId.includes(uuid)}
            onClick={() => setSelectedTarifsId((prev) => [...prev, uuid])}
          />
        ),
        width: 50,
      },
    ],
    [selectedTarifsId]
  );

  return (
    <>
      <Row className={styles.wrapper} justify={'center'} align={'middle'}>
        <Col span={20}>
          <Row justify={'center'} className={styles.title}>
            <Typography.Title level={3}>{InterfaceLabels.PP_TITLE}</Typography.Title>
          </Row>
          <Carousel arrows>
            {TARIFS_TYPE.map(({ type, title, tarifs, trenerPrice }) => (
              <Card key={type}>
                <div className={styles.cardWrapper}>
                  <Typography.Text strong>{title}</Typography.Text>
                  <Table
                    className={styles.cardTable}
                    bordered
                    pagination={false}
                    columns={columns}
                    dataSource={tarifs}
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
        </Col>
      </Row>
      <SelectedDrawer
        selectedTarifsId={selectedTarifsId}
        setSelectedTarifsId={setSelectedTarifsId}
        initTrainerSelected={initTrainerSelected}
        isTrenerSelected={isTrenerSelected}
        setIsTrenerSelected={setIsTrenerSelected}
      />
    </>
  );
};
