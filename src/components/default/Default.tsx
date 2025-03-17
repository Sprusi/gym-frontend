import { useState } from 'react';

import styles from './Default.module.scss';

export const Default = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.defaultWrapper}>
      <div className={styles.defaultContent}>
        <h1>{count}</h1>
        <button className={styles.defaultContentButton} onClick={() => setCount((prev) => prev + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
