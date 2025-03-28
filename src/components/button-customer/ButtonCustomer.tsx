import React, { FC } from 'react';

import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';

import styles from './ButtonCustomer.module.scss';

type ButtonCustomedType = 'dark' | 'light' | 'transparent';

type ButtonConfig = {
  className?: string;
};

type ButtonCustomedProps = Omit<ButtonProps, 'type'> & {
  type?: ButtonProps['type'] | ButtonCustomedType;
};

const EXPAND_CONFIG: Record<ButtonCustomedType, ButtonConfig> = {
  dark: { className: `${styles.dark} ${styles.button}` },
  light: { className: `${styles.light} ${styles.button}` },
  transparent: { className: `${styles.transparent} ${styles.button}` },
};

/**
 * Компонент ButtonCustomer — это обертка над кнопкой Ant Design, которая предоставляет дополнительные настройки
 * для создания кнопок с предопределенными типами (например, "dark", "light", "transparent").
 *
 * @param {AntdButtonProps['type'] | ButtonCustomedType} [type] - Тип кнопки. Может быть одним из предопределенных
 *   типов ('dark', 'light', 'transparent') или стандартным типом Ant Design.
 * @param {string} [className] - Дополнительный класс для стилизации кнопки.
 * @param {ReactNode} [children] - Содержимое кнопки (текст или другие элементы).
 */

export const ButtonCustomer: FC<ButtonCustomedProps> = ({ children, type, className, ...restProps }) => {
  const isCustomType = Object.keys(EXPAND_CONFIG).includes(type as ButtonCustomedType);
  const config = isCustomType ? EXPAND_CONFIG[type as ButtonCustomedType] : {};

  const finalClassName = classNames(className, config.className);

  return (
    <Button {...restProps} className={finalClassName}>
      {children}
    </Button>
  );
};
