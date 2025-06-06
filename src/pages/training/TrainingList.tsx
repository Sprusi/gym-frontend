import React, { useEffect, useMemo, useState } from 'react';

import { Card, Row, Space, Switch, Table, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import styles from './TrainingList.module.scss';
import { useTrainingColumns } from './useTrainingColumns';
import { useTrainingStore } from '@/stores/training/useTrainingStore';

export const TrainingList = () => {
  const [isMyTraining, setIsMyTraining] = useState(true);
  const { loading, updateNeeded, trainingData, getAllTraining } = useTrainingStore();
  const columns = useTrainingColumns();

  useEffect(() => {
    updateNeeded && getAllTraining();
  }, [updateNeeded]);

  const filteredData = useMemo(
    () => trainingData.filter((el) => (isMyTraining ? el.type === 'private' : el.type === 'group')),
    [trainingData, isMyTraining]
  );

  return (
    <>
      <Row justify={'center'} className={styles.title}>
        <Typography.Title level={2}>{InterfaceLabels.TLP_TITLE}</Typography.Title>
      </Row>
      <Card>
        <Row justify="space-between" className={styles.header}>
          <Space size="large">
            <Typography.Text strong>{InterfaceLabels.TLP_TYPE}</Typography.Text>
            <Switch
              checkedChildren={InterfaceLabels.TLP_TYPE_VALUES.my}
              unCheckedChildren={InterfaceLabels.TLP_TYPE_VALUES.group}
              value={isMyTraining}
              onChange={setIsMyTraining}
              disabled={loading}
            />
          </Space>
          <ButtonCustomed size="large">{InterfaceLabels.TLP_SIGN_UP}</ButtonCustomed>
        </Row>
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey={'id'} />
      </Card>
    </>
  );
};
