import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Card, Row, Space, Switch, Table, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import { TrainingEditModal } from './create-modal/TrainingCreateModal';
import styles from './TrainingList.module.scss';
import { useTrainingColumns } from './useTrainingColumns';
import { useHasRole } from '@/hook/useHasRole';
import { useTrainingStore } from '@/stores/training/useTrainingStore';

export const TrainingList = () => {
  const { isManager } = useHasRole();
  const [isMyTraining, setIsMyTraining] = useState(true);
  const {
    loading,
    updateNeeded,
    trainingData,
    allTrainingData,
    trainers,
    getTraining,
    getAllTraining,
    getTrainers,
    setModalOpen,
  } = useTrainingStore();

  const columns = useTrainingColumns(trainers, isManager);

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    updateNeeded && getTraining();
    updateNeeded && getAllTraining();
  }, [updateNeeded]);

  const filteredData = useMemo(() => {
    const dataSource = isManager ? allTrainingData : trainingData;
    return dataSource.filter((el) => (isMyTraining ? el.type === 'private' : el.type === 'group'));
  }, [trainingData, isMyTraining, isManager]);

  const handleSingUp = useCallback(() => setModalOpen(true), []);

  const actionButtonTitle = isManager ? InterfaceLabels.TLP_CREATE : InterfaceLabels.TLP_SIGN_UP;
  const isCheckedTitle = isManager
    ? InterfaceLabels.TLP_TYPE_VALUES_ADMIN.private
    : InterfaceLabels.TLP_TYPE_VALUES.private;
  const isUnCheckedValue = isManager
    ? InterfaceLabels.TLP_TYPE_VALUES_ADMIN.group
    : InterfaceLabels.TLP_TYPE_VALUES.group;

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
              checkedChildren={isCheckedTitle}
              unCheckedChildren={isUnCheckedValue}
              value={isMyTraining}
              onChange={setIsMyTraining}
              disabled={loading}
            />
          </Space>
          <ButtonCustomed size="large" onClick={handleSingUp}>
            {actionButtonTitle}
          </ButtonCustomed>
        </Row>
        <Table columns={columns} dataSource={filteredData} loading={loading} rowKey={'id'} />
      </Card>

      <TrainingEditModal setIsMyTraining={setIsMyTraining} />
    </>
  );
};
