import React, { FC, ReactNode } from 'react';

import styles from './BackgroundMotion.module.scss';

interface BackgroundMotionProps {
  children: ReactNode;
}

export const BackgroundMotion: FC<BackgroundMotionProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperShadow}>{children}</div>
    </div>
  );
};
