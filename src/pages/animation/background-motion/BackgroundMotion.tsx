import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';

import styles from './BackgroundMotion.module.scss';

interface BackgroundMotionProps {
  children: ReactNode;
}

export const BackgroundMotion: FC<BackgroundMotionProps> = ({ children }) => {
  const microfrontClasses = window.IS_MICROFRONTEND ? styles.wrapperMicrofront : '';
  return (
    <div className={classNames(styles.wrapper, microfrontClasses)}>
      <div className={styles.wrapperShadow}>{children}</div>
    </div>
  );
};
