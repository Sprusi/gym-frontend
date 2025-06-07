import React, { FC, useCallback } from 'react';

import { DatePicker, Form, Modal, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';

import { Formats, InterfaceLabels } from '@/constants';
import { getRequiredRule } from '@/utils/FormUtils';

import styles from '../TrainingList.module.scss';

import { Training } from '@/dto/training/Training';
import { MessageService } from '@/service/MessageService';
import { useTrainingStore } from '@/stores/training/useTrainingStore';

const { Item } = Form;

interface TrainingEditModalProps {
  setIsMyTraining: (l: boolean) => void;
}

export const TrainingEditModal: FC<TrainingEditModalProps> = ({ setIsMyTraining }) => {
  const [form] = Form.useForm();
  const { loading, modalOpen, setModalOpen, addTraining } = useTrainingStore();

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then(async (formData) => {
        try {
          const date = formData.date ? dayjs(formData.date).format(Formats.DATE) : undefined;
          const time = formData.time ? dayjs(formData.time).format(Formats.TIME_WHITHOUT_SEC) : undefined;
          const dto = { ...formData, date, time, type: 'private' } as Training;
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

  return (
    <Modal
      title={InterfaceLabels.TLP_CM_TITLE}
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
    >
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Item name="date" label={InterfaceLabels.TLP_COLUMNS.date} rules={[getRequiredRule()]}>
          <DatePicker format={Formats.DATE_VIEW} className={styles.modalFormItemDate} />
        </Item>
        <Item name="time" label={InterfaceLabels.TLP_COLUMNS.time} rules={[getRequiredRule()]}>
          <TimePicker format={Formats.TIME_WHITHOUT_SEC} className={styles.modalFormItemTime} />
        </Item>
        <Item
          name="triner"
          label={InterfaceLabels.TLP_COLUMNS.trainer}
          // rules={[getRequiredRule()]}
        >
          <Select options={[]} />
        </Item>
        <Item name="holl" label={InterfaceLabels.TLP_COLUMNS.holl}>
          <Select options={[]} />
        </Item>
      </Form>
    </Modal>
  );
};
