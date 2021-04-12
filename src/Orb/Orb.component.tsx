import React from 'react';
import type { FC } from 'react';

import useHooks from './Orb.hooks';
import styles from './Orb.module.css';

const QS = import.meta.env
  .SNOWPACK_PUBLIC_ID
  ? `?id=${
      import.meta.env.SNOWPACK_PUBLIC_ID
    }`
  : '';

const Orb: FC = () => {
  const { show } = useHooks();

  return (
    <aside
      className={`${styles.Container}${
        show ? ' ' + styles.Show : ''
      }`}
    >
      Deploy full-stack apps fast on
      Orb!
      <a
        className={styles.Link}
        href={`https://www.orbclouds.com${QS}`}
        title="Deploy on Orb"
      >
        Go
      </a>
    </aside>
  );
};

export default Orb;
