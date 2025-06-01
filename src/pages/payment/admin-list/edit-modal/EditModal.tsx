import React, { memo, useCallback, useEffect } from 'react';

import { Form, InputNumber, Modal, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils';
import { getRequiredRule } from '@/utils/FormUtils';

import styles from '../PaymentList.module.scss';

import { GlobalTicketType } from '@/dto/enums/GlobalTicketType';
import { TicketType } from '@/dto/enums/TicketsType';
import { MessageService } from '@/service/MessageService';
import { usePaymentStore } from '@/stores/payment/usePaymentStore';

const { Item } = Form;
const { RangePicker } = TimePicker;

const EditModal = () => {
  const [form] = Form.useForm();
  const { loading, editModalOpen, setEditModalOpen, createTicket, editTicket, record } = usePaymentStore();

  useEffect(() => {
    if (!record) return;
    form.setFieldsValue({ ...record, time: [dayjs(record.timeStart, 'HH:mm'), dayjs(record.timeEnd, 'HH:mm')] });
  }, [record]);

  const isCreate = !record;
  const title = isCreate ? InterfaceLabels.PLP_EM_TITLE_EDIT : InterfaceLabels.PLP_EM_TITLE_CREATE;

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then(async (formData) => {
        try {
          const [start, end] = formData.time ?? [];
          const timeStart = start ? dayjs(start).format('HH:mm') : undefined;
          const timeEnd = end ? dayjs(end).format('HH:mm') : undefined;
          const dto = { ...formData, timeStart, timeEnd, time: undefined };
          if (isCreate) {
            await createTicket(dto);
          } else {
            //@ts-ignore
            await editTicket(record?.id, dto);
          }
          form.resetFields();
        } catch (error) {
          console.log('error', error);
        }
      })
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, [form, record, isCreate, createTicket, editTicket]);

  const handleCancel = useCallback(() => {
    setEditModalOpen(false);
    form.resetFields();
  }, [form]);

  return (
    <Modal title={title} open={editModalOpen} onOk={handleOk} onCancel={handleCancel} loading={loading}>
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Item name="globalType" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_COLUMNS.globalType}>
          <Select
            className={styles.editModalField}
            options={Object.keys(GlobalTicketType).map((value) => ({
              value,
              label: GlobalTicketType[value as keyof typeof GlobalTicketType],
            }))}
          />
        </Item>
        <Item name="type" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_COLUMNS.type}>
          <Select
            className={styles.editModalField}
            options={Object.keys(TicketType).map((value) => ({
              value,
              label: TicketType[value as keyof typeof TicketType],
            }))}
          />
        </Item>
        <Item name="time" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_COLUMNS.time}>
          <RangePicker format="HH:mm" showSecond={false} className={styles.editModalField} />
        </Item>
        <Item name="price" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_COLUMNS.price}>
          <InputNumber
            className={styles.editModalField}
            formatter={(value) => formatAmountToLookGood(value) || ''}
            parser={(value) =>
              value
                ?.replace(/\s/g, '')
                .replace(',', '.')
                .replace(/[^\d.-]/g, '')
                .trim() || ''
            }
          />
        </Item>
      </Form>
    </Modal>
  );
};

export default memo(EditModal);
