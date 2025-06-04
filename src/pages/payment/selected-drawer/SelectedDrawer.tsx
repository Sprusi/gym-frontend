import React, { FC, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { DeleteFilled, MinusCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, Empty, List, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { localStorageAuth } from '@/utils';
import { formatAmountToLookGood } from '@/utils/NumberUtils';
import { getDefaultPath } from '@/utils/SecurityUtils';

import { GlobalTicketType } from '../../../dto/enums/GlobalTicketType';
import styles from '../Payment.module.scss';

import { GroupTariff } from '@/dto/payment/SeasonTicket';
import { useHasRole } from '@/hook/useHasRole';
import { useToken } from '@/hook/useToken';
import { MessageService } from '@/service/MessageService';

const { Item } = List;

interface SelectedDrawerProps {
  selectedTarifsIds: number[];
  setSelectedTarifsIds: (l: number[] | ((prev: number[]) => number[])) => void;
  initTrainerSelected: Record<string, boolean>;
  isTrenerSelected: Record<string, boolean>;
  setIsTrenerSelected: (
    record: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
  instanceData: GroupTariff[];
  setCalculateKey: (l: number | ((l: number) => number)) => void;
}

export const SelectedDrawer: FC<SelectedDrawerProps> = ({
  selectedTarifsIds,
  setSelectedTarifsIds,
  initTrainerSelected,
  isTrenerSelected,
  setIsTrenerSelected,
  instanceData,
  setCalculateKey,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, payload } = useToken();
  const { isManager } = useHasRole();

  const [open, setOpen] = useState(false);

  const storePrefix = payload?.email || '';
  const tariffsDidBuy = !!JSON.parse(localStorage.getItem('selectedTarifsIds' + storePrefix) || '[]').length;

  const disabled = useMemo(() => tariffsDidBuy && !isManager, [tariffsDidBuy, isManager]);

  const showDrawer = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  const handleRemoveTariff = (id: number) => setSelectedTarifsIds((prev) => prev.filter((i) => i !== id));
  const toggleTrainer = (type: string) => setIsTrenerSelected((prev) => ({ ...prev, [type]: !prev[type] }));
  const handlePayt = () => {
    if (isAuthenticated) {
      localStorage.setItem('selectedTarifsIds' + storePrefix, JSON.stringify(selectedTarifsIds));
      localStorage.setItem('isTrenerSelected' + storePrefix, JSON.stringify(isTrenerSelected));
      setSelectedTarifsIds([]);
      setIsTrenerSelected(initTrainerSelected);
      setOpen(false);
      navigate(getDefaultPath());
      MessageService.success();
      setCalculateKey((prev) => (prev += 1));
    }
    if (!isAuthenticated) {
      localStorageAuth.pushRequestedPath(window.location.href);
      navigate('/login');
    }
  };

  const data = useMemo(() => {
    return instanceData.map((el) => ({
      ...el,
      tariffs: el.tariffs.filter(({ id }) => selectedTarifsIds.includes(id)),
      trenerPrice: isTrenerSelected[el.type] ? el.trenerPrice : undefined,
    }));
  }, [selectedTarifsIds, isTrenerSelected]);

  const isSelectedData = useMemo(() => data.some((el) => el.tariffs.length), [data]);

  return (
    <>
      {!disabled && (
        <>
          <Badge count={selectedTarifsIds.length} className={styles.selectedDrawer}>
            <Avatar size={64} icon={<ShoppingCartOutlined />} onClick={showDrawer} />
          </Badge>
          <Drawer
            destroyOnHidden
            title={InterfaceLabels.PP_SELECTED_TARIFS}
            closable={{ 'aria-label': 'Close Button' }}
            onClose={onClose}
            open={open}
            size="large"
          >
            {isSelectedData ? (
              <List
                itemLayout="horizontal"
                size="large"
                dataSource={data}
                renderItem={({ type, tariffs, trenerPrice }) =>
                  tariffs.map((tariff, index) => (
                    <Item
                      key={tariff.id}
                      actions={[
                        <DeleteFilled
                          key="delete"
                          className={styles.selectedDrawerDelete}
                          onClick={() => handleRemoveTariff(tariff.id)}
                        />,
                      ]}
                    >
                      <Item.Meta
                        title={
                          <Typography.Text>
                            {GlobalTicketType[type as keyof typeof GlobalTicketType]} -{' '}
                            {formatAmountToLookGood(tariff.price)}
                          </Typography.Text>
                        }
                        description={`${tariff.name} - ${InterfaceLabels.FROM_TO[0]} ${tariff.time[0]} ${InterfaceLabels.FROM_TO[1]} ${tariff.time[1]}`}
                      />
                      {trenerPrice && index === 0 && (
                        <Space size="small">
                          <MinusCircleOutlined onClick={() => toggleTrainer(type)} />
                          <>
                            {InterfaceLabels.PP_TRENER} {formatAmountToLookGood(trenerPrice)}
                          </>
                        </Space>
                      )}
                    </Item>
                  ))
                }
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {isSelectedData && (
              <ButtonCustomed size="large" className={styles.selectedDrawerPayt} onClick={handlePayt}>
                {InterfaceLabels.PP_PAYT}
              </ButtonCustomed>
            )}
          </Drawer>
        </>
      )}
    </>
  );
};
