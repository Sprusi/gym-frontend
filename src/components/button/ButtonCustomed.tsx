import React, { FC } from 'react';

import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import classNames from 'classnames';

import styles from './ButtonCustomed.module.scss';

type ButtonCustomedType = 'transparent';

type ButtonConfig = {
  className?: string;
  antdType?: AntdButtonProps['type'];
};

type ButtonCustomedProps = Omit<AntdButtonProps, 'type'> & {
  type?: AntdButtonProps['type'] | ButtonCustomedType;
};

const EXPAND_CONFIG: Record<ButtonCustomedType, ButtonConfig> = {
  transparent: {
    className: styles.transparent,
    antdType: 'default',
  },
};

/**
 * Компонент ButtonCustomed — это обертка над кнопкой Ant Design, которая предоставляет дополнительные настройки
 * для создания кнопок с предопределенными типами (например, "transparent").
 *
 * @param {AntdButtonProps['type'] | ButtonCustomedType} [type] - Тип кнопки. Может быть одним из предопределенных
 *   типов ('transparent') или стандартным типом Ant Design.
 * @param {string} [className] - Дополнительный класс для стилизации кнопки.
 * @param {ReactNode} [children] - Содержимое кнопки (текст или другие элементы).
 */

export const ButtonCustomed: FC<ButtonCustomedProps> = ({ type, children, className, ...restProps }) => {
  const isCustomType = Object.keys(EXPAND_CONFIG).includes(type as ButtonCustomedType);

  const config = isCustomType ? EXPAND_CONFIG[type as ButtonCustomedType] : {};

  const finalAntdType: AntdButtonProps['type'] = isCustomType
    ? config.antdType || 'default'
    : (type as AntdButtonProps['type']);

  const finalClassName = classNames(className, config.className);

  return (
    <AntdButton {...restProps} type={finalAntdType} className={finalClassName}>
      {children}
    </AntdButton>
  );
};

ButtonCustomed.displayName = 'ButtonCustomed';
