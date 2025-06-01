import React, { FC, memo, useCallback } from 'react';

import { Form, InputNumber, Modal, Row, Select } from 'antd';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils';
import { getRequiredRule } from '@/utils/FormUtils';

import styles from '../PaymentList.module.scss';

import { GlobalTicketType } from '@/dto/enums/GlobalTicketType';
import { MessageService } from '@/service/MessageService';
import { usePaymentStore } from '@/stores/payment/usePaymentStore';

const { Item } = Form;

export const TrainerModal: FC = () => {
  const [form] = Form.useForm();
  const { loading, trainerModalOpen, setTrainerModalOpen, setTrainerPrice } = usePaymentStore();

  const handleOk = useCallback(() => {
    form
      .validateFields()
      .then((formData) => setTrainerPrice(formData).then(() => form.resetFields()))
      .catch(() => MessageService.warn(InterfaceLabels.VALIDATION_ERROR));
  }, []);
  const handleCancel = useCallback(() => {
    setTrainerModalOpen(false);
    form.resetFields();
  }, []);

  return (
    <Modal
      title={InterfaceLabels.PLP_TM_TITLE}
      open={trainerModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      loading={loading}
    >
      <Form form={form} layout="vertical" labelWrap wrapperCol={{ span: 24 }}>
        <Row>
          <Item name="globalType" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_TM_GLOBAL_TYPE_FIELD}>
            <Select
              className={styles.trainerModalField}
              options={Object.keys(GlobalTicketType).map((value) => ({
                value,
                label: GlobalTicketType[value as keyof typeof GlobalTicketType],
              }))}
            />
          </Item>
        </Row>
        <Row>
          <Item name="trainerPrice" rules={[getRequiredRule()]} label={InterfaceLabels.PLP_TM_TRAINER_PRICE}>
            <InputNumber
              className={styles.trainerModalField}
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
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(TrainerModal);
