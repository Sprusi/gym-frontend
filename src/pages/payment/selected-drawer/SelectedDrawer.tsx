import React, { FC, useMemo, useState } from 'react';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { DeleteFilled, MinusCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Drawer, List, Space, Typography } from 'antd';

import { ButtonCustomed } from '@/components/button/ButtonCustomed';

import { InterfaceLabels } from '@/constants';
import { formatAmountToLookGood } from '@/utils/NumberUtils';

import styles from '../Payment.module.scss';
import { TariffData, TARIFS_TYPE } from '../settings';
import { TariffTipesEnum } from '../TariffTipesEnum';

import { MessageService } from '@/service/MessageService';

const { Item } = List;

interface SelectedDrawerProps {
  selectedTarifsId: string[];
  setSelectedTarifsId: (l: string[] | ((prev: string[]) => string[])) => void;
  initTrainerSelected: Record<string, boolean>;
  isTrenerSelected: Record<string, boolean>;
  setIsTrenerSelected: (
    l: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
}

export const SelectedDrawer: FC<SelectedDrawerProps> = ({
  selectedTarifsId,
  setSelectedTarifsId,
  initTrainerSelected,
  isTrenerSelected,
  setIsTrenerSelected,
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

  const selectedData = useMemo(() => {
    const data = selectedTarifsId.reduce<Record<string, { items: TariffData[]; trenerPrice?: string }>>((acc, uuid) => {
      for (const tarifGroup of TARIFS_TYPE) {
        const tarif = tarifGroup.tarifs.find((t) => t.uuid === uuid);
        if (tarif) {
          if (!acc[tarifGroup.type]) {
            acc[tarifGroup.type] = { items: [], trenerPrice: undefined };
          }
          acc[tarifGroup.type].items.push(tarif);
          if (isTrenerSelected[tarifGroup.type]) {
            acc[tarifGroup.type].trenerPrice = tarifGroup.trenerPrice;
          }
          break;
        }
      }
      return acc;
    }, {});
    return Object.entries(data);
  }, [selectedTarifsId, isTrenerSelected]);

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
        <List
          itemLayout="horizontal"
          size="large"
          dataSource={selectedData}
          renderItem={([type, { items, trenerPrice }]) =>
            items.map((tarif, index) => (
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
        {!!selectedData.length && (
          <ButtonCustomed size="large" className={styles.selectedDrawerPayt} onClick={handlePayt}>
            {InterfaceLabels.PP_PAYT}
          </ButtonCustomed>
        )}
      </Drawer>
    </>
  );
};
