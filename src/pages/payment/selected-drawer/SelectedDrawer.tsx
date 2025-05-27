import React, { FC, useMemo, useState } from 'react';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { DeleteFilled, MinusCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, Empty, List, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils/NumberUtils';

import styles from '../Payment.module.scss';
import { GroupTariff } from '../settings';
import { TariffTipesEnum } from '../TariffTipesEnum';

import { MessageService } from '@/service/MessageService';

const { Item } = List;

interface SelectedDrawerProps {
  selectedTarifsId: string[];
  setSelectedTarifsId: (l: string[] | ((prev: string[]) => string[])) => void;
  initTrainerSelected: Record<string, boolean>;
  isTrenerSelected: Record<string, boolean>;
  setIsTrenerSelected: (
    record: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
  instanceData: GroupTariff[];
}

export const SelectedDrawer: FC<SelectedDrawerProps> = ({
  selectedTarifsId,
  setSelectedTarifsId,
  initTrainerSelected,
  isTrenerSelected,
  setIsTrenerSelected,
  instanceData,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleRemoveTariff = (uuid: string) => setSelectedTarifsId((prev) => prev.filter((id) => id !== uuid));
  const toggleTrainer = (type: string) => setIsTrenerSelected((prev) => ({ ...prev, [type]: !prev[type] }));
  const handlePayt = () => {
    setSelectedTarifsId([]);
    setIsTrenerSelected(initTrainerSelected);
    MessageService.success();
  };

  const data = useMemo(() => {
    return instanceData.map((el) => ({
      ...el,
      tariffs: el.tariffs.filter(({ uuid }) => selectedTarifsId.includes(uuid)),
      trenerPrice: isTrenerSelected[el.type] ? el.trenerPrice : undefined,
    }));
  }, [selectedTarifsId, isTrenerSelected]);

  const isSelectedData = useMemo(() => data.some((el) => el.tariffs.length), [data]);

  return (
    <>
      <Badge count={selectedTarifsId.length} className={styles.selectedDrawer}>
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
              tariffs.map((tarif, index) => (
                <Item
                  key={tarif.uuid}
                  actions={[
                    <DeleteFilled
                      key="delete"
                      className={styles.selectedDrawerDelete}
                      onClick={() => handleRemoveTariff(tarif.uuid)}
                    />,
                  ]}
                >
                  <Item.Meta
                    title={
                      <Typography.Text>
                        {TariffTipesEnum[type as keyof typeof TariffTipesEnum]} - {formatAmountToLookGood(tarif.price)}
                      </Typography.Text>
                    }
                    description={`${tarif.name} - ${InterfaceLabels.FROM_TO[0]} ${tarif.time[0]} ${InterfaceLabels.FROM_TO[1]} ${tarif.time[1]}`}
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
  );
};
