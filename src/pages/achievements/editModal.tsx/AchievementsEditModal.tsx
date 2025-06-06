import React, { FC, memo, useCallback, useEffect } from 'react';

import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

import { Formats, InterfaceLabels } from '@/constants';
import { getRequiredRule } from '@/utils/FormUtils';

import styles from '../Achievements.module.scss';

import { MessageService } from '@/service/MessageService';
import { useAchievementsStore } from '@/stores/achievements/useAchievementsStore';

const { Item } = Form;

const AchievementsEditModal: FC = () => {
  const [form] = Form.useForm();
  const { loading, modalOpen, setModalOpen, addAchievement, record } = useAchievementsStore();

  useEffect(() => {
    if (!record) return;
    form.setFieldsValue({ ...record, date: dayjs(record.date) });
  }, [record]);

  const isCreate = !record;
  const title = isCreate ? InterfaceLabels.AP_EM_TITLE_EDIT : InterfaceLabels.AP_EM_TITLE_CREATE;

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then(async (formData) => {
        try {
          const date = formData.date ? dayjs(formData.date).format(Formats.DATE) : undefined;
          const dto = { ...formData, date };
          if (isCreate) {
            await addAchievement(dto);
          }
          form.resetFields();
        } catch (error) {
          console.log('error', error);
        }
      })
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, [form, record, isCreate]);

  const handleCancel = useCallback(() => {
    setModalOpen(false);
    form.resetFields();
  }, [form]);

  return (
    <Modal title={title} open={modalOpen} onOk={handleOk} onCancel={handleCancel} loading={loading}>
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Item name="date" rules={[getRequiredRule()]} label={InterfaceLabels.AP_COLUMNS.date}>
          <DatePicker format={Formats.DATE_VIEW} className={styles.formItemDate} />
        </Item>
        <Item name="calories" label={InterfaceLabels.AP_COLUMNS.calories}>
          <InputNumber className={styles.formItemCalories} />
        </Item>
        <Item name="group" rules={[getRequiredRule()]} label={InterfaceLabels.AP_COLUMNS.group}>
          <Input />
        </Item>
        <Item name="comment" label={InterfaceLabels.AP_COLUMNS.comment}>
          <TextArea rows={3} />
        </Item>
      </Form>
    </Modal>
  );
};

export default memo(AchievementsEditModal);
