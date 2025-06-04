import React, { FC, useEffect } from 'react';

import { Card, Row, Table, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';

import styles from './Achievements.module.scss';
import AchievementsEditModal from './editModal.tsx/AchievementsEditModal';
import { Achievement } from '@/dto/achievements/Achievement';
import { useAchievementsStore } from '@/stores/achievements/useAchievementsStore';

export const Achievements: FC = () => {
  const { updateNeeded, achievement, setModalOpen, getAllAchievements } = useAchievementsStore();

  useEffect(() => {
    updateNeeded && getAllAchievements();
  }, [updateNeeded]);

  const columns = [
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

  return (
    <>
      <Row justify={'center'} className={styles.title}>
        <Typography.Title level={3}>{InterfaceLabels.AP_TITLE}</Typography.Title>
      </Row>
      <Card
        extra={
          <ButtonCustomed type="primary" onClick={() => setModalOpen(true)}>
            {InterfaceLabels.AP_ADD_BUTTON}
          </ButtonCustomed>
        }
      >
        <Table bordered dataSource={achievement} columns={columns} />
      </Card>

      <AchievementsEditModal />
    </>
  );
};
