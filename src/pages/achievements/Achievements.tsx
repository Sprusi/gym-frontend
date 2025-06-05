import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Card, Row, Table, Tag, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { showError } from '@/utils';

import styles from './Achievements.module.scss';
import AchievementsEditModal from './editModal.tsx/AchievementsEditModal';
import { AchievementsGraff } from './graff/AchievementsGraff';
import { useAchievementsColumns } from './useAchievementsColumns';
import { Person } from '@/dto/person/Person';
import { useToken } from '@/hook/useToken';
import { ProfileService } from '@/service';
import { useAchievementsStore } from '@/stores/achievements/useAchievementsStore';

export const Achievements: FC = () => {
  const { payload } = useToken();
  const [person, setPerson] = useState<Person>();

  const { updateNeeded, achievement, setModalOpen, getAllAchievements, deleteAchievement } = useAchievementsStore();

  useEffect(() => getPerson(), []);
  useEffect(() => {
    updateNeeded && getAllAchievements();
  }, [updateNeeded]);

  const getPerson = useCallback(() => {
    if (!payload?.id) return;
    ProfileService.getUserById(payload?.id)
      .then(({ data }) => setPerson(data))
      .catch(showError);
  }, [payload?.id]);

  const columns = useAchievementsColumns(deleteAchievement);

  const title = useMemo(
    () =>
      person ? (
        <>
          {`${InterfaceLabels.AP_IDEAL_INDICATOR} - `}
          <Tag color="#555555de" className={styles.tag}>
            {person.kalNorm}
          </Tag>
          {` ${InterfaceLabels.KCAL_DAY}`}
        </>
      ) : null,
    [person]
  );

  return (
    <>
      <Row justify={'center'} className={styles.title}>
        <Typography.Title level={3}>{InterfaceLabels.AP_TITLE}</Typography.Title>
      </Row>
      <Card
        title={title}
        extra={
          <ButtonCustomed type="primary" onClick={() => setModalOpen(true)}>
            {InterfaceLabels.AP_ADD_BUTTON}
          </ButtonCustomed>
        }
      >
        <Table bordered dataSource={achievement} columns={columns} rowKey={'id'} />
      </Card>

      <AchievementsGraff achievements={achievement} />

      <AchievementsEditModal />
    </>
  );
};
