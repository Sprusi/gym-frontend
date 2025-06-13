import React, { FC, useCallback, useMemo } from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { DatePicker, Form, Modal, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';

import { Formats, InterfaceLabels } from '@/constants';
import { getOptionsFromEnum, getRequiredRule } from '@/utils/FormUtils';

import styles from '../TrainingList.module.scss';

import { NOT_WORK_TIME_HOURS, TRAINING_DURATION_MINUTES } from './settings';
import { HollNames, HollNamesKeys } from '@/dto/enums/HollNames';
import { Training } from '@/dto/training/Training';
import { useHasRole } from '@/hook/useHasRole';
import { MessageService } from '@/service/MessageService';
import { useTrainingStore } from '@/stores/training/useTrainingStore';

const { Item } = Form;

interface TrainingEditModalProps {
  setIsMyTraining: (l: boolean) => void;
}

export const TrainingEditModal: FC<TrainingEditModalProps> = ({ setIsMyTraining }) => {
  const [form] = Form.useForm();
  const { isManager } = useHasRole();
  const { loading, modalOpen, setModalOpen, addTraining, allTrainingData, trainers } = useTrainingStore();

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then(async (formData) => {
        try {
          const date = formData.date ? dayjs(formData.date).format(Formats.DATE) : undefined;
          const time = formData.time ? dayjs(formData.time).format(Formats.TIME_WHITHOUT_SEC) : undefined;
          const dto: Training = {
            ...formData,
            date,
            time,
            type: isManager ? 'group' : 'private',
          };
          await addTraining(dto);
          setIsMyTraining(true);
          form.resetFields();
        } catch (error) {
          console.log('error', error);
        }
      })
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, [form]);

  const handleCancel = useCallback(() => {
    setModalOpen(false);
    form.resetFields();
  }, [form]);

  const handleClearTime = useCallback(() => form.setFieldValue('time', null), [form]);

  const formDateValue = Form.useWatch('date', form);
  const formTrainerIdValue = Form.useWatch('trainerId', form);

  const disabledTime = useCallback(() => {
    if (!formDateValue || !formTrainerIdValue)
      return {
        disabledHours: () => [...NOT_WORK_TIME_HOURS],
        disabledMinutes: () => [],
      };

    const selectedDateStr = dayjs(formDateValue).format(Formats.DATE);
    const filteredTrainings = allTrainingData.filter(
      (t) => t.trainerId === formTrainerIdValue && t.date === selectedDateStr
    );

    const blockedMinutesByHour = new Map<number, Set<number>>();

    filteredTrainings.forEach((t) => {
      const start = dayjs(`${t.date} ${t.time}`, `${Formats.DATE} ${Formats.TIME_WHITHOUT_SEC}`);
      const realStart = start.subtract(1, 'hour');
      const end = start.add(TRAINING_DURATION_MINUTES, 'minute');
      let current = realStart.clone();

      while (current.isBefore(end)) {
        const hour = current.hour();
        const minute = current.minute();
        let minutesSet = blockedMinutesByHour.get(hour);
        if (minutesSet === undefined) {
          minutesSet = new Set<number>();
          minutesSet.add(minute);
          blockedMinutesByHour.set(hour, minutesSet);
        } else {
          minutesSet.add(minute);
        }
        current = current.add(1, 'minute');
      }
    });

    return {
      disabledHours: () => {
        const blockedHours = Array.from(blockedMinutesByHour.keys()).filter(
          (h) => blockedMinutesByHour.get(h)?.size === 60
        );
        return [...NOT_WORK_TIME_HOURS, ...blockedHours];
      },
      disabledMinutes: (selectedHour: number) => {
        const minutes = blockedMinutesByHour.get(selectedHour);
        return minutes ? Array.from(minutes.keys()) : [];
      },
    };
  }, [formDateValue, formTrainerIdValue, allTrainingData]);

  const trainerOptions = useMemo(() => trainers.map((el) => ({ label: el.email, value: el.id })), [trainers]);
  const hollOptions = useMemo(
    () => getOptionsFromEnum(HollNames).filter((el) => (isManager ? el.value !== HollNamesKeys.base : true)),
    [isManager]
  );

  return (
    <Modal
      title={InterfaceLabels.TLP_CM_TITLE}
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        labelWrap
        wrapperCol={{ span: 24 }}
        initialValues={isManager ? {} : { holl: HollNames.base }}
      >
        <Item name="date" label={InterfaceLabels.TLP_COLUMNS.date} rules={[getRequiredRule()]}>
          <DatePicker format={Formats.DATE_VIEW} className={styles.modalFormItemDate} onChange={handleClearTime} />
        </Item>
        <Item name="trainerId" label={InterfaceLabels.TLP_COLUMNS.trainer} rules={[getRequiredRule()]}>
          <Select options={trainerOptions} onChange={handleClearTime} />
        </Item>
        <Item
          name="time"
          label={InterfaceLabels.TLP_COLUMNS.time}
          rules={[getRequiredRule()]}
          tooltip={{ title: InterfaceLabels.TLP_CM_TIME_TOOLTIP, icon: <ExclamationCircleOutlined /> }}
        >
          <TimePicker
            format={Formats.TIME_WHITHOUT_SEC}
            needConfirm={false}
            disabledTime={disabledTime}
            minuteStep={30}
            className={styles.modalFormItemTime}
          />
        </Item>
        <Item name="holl" label={InterfaceLabels.TLP_COLUMNS.holl} rules={isManager ? [getRequiredRule()] : []}>
          <Select disabled={!isManager} options={hollOptions} />
        </Item>
      </Form>
    </Modal>
  );
};
