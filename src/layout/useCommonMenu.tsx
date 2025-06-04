import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CreditCardOutlined, FlagOutlined, ProfileOutlined } from '@ant-design/icons';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { MenuInfo } from 'rc-menu/lib/interface';

import { InterfaceLabels } from '@/constants';
import { hasAccess } from '@/utils/SecurityUtils';

import { useMenuStore } from '@/stores/menu/useMenuStore';

export const useCommonMenu = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { menuKey, setMenuKey } = useMenuStore();

  useEffect(() => setMenuKey(currentLocation.pathname.replace(`/gym/`, '')), []);

  const handleMenuChange = useCallback(({ key }: MenuInfo) => {
    navigate(key);
    setMenuKey(key);
  }, []);

  const menuItems: ItemType<MenuItemType>[] = [];

  hasAccess('payment-profile') &&
    menuItems.push({
      key: 'payment-profile',
      icon: <CreditCardOutlined />,
      label: InterfaceLabels.PAYMENT_PROFILE,
    });
  hasAccess('achievements') &&
    menuItems.push({
      key: 'achievements',
      icon: <FlagOutlined />,
      label: InterfaceLabels.ACHIEVEMENTS,
    });
  hasAccess('payment-list') &&
    menuItems.push({
      key: 'payment-list',
      icon: <ProfileOutlined />,
      label: InterfaceLabels.PAYMENT_LIST,
    });

  return { menuItems, menuKey, handleMenuChange };
};
