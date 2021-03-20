import React from 'react';
import type {
  FC,
  ButtonHTMLAttributes,
} from 'react';

import styles from './Card.module.css';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Card: FC<Props> = ({
  children,
  onClick,
  className,
  onPointerEnter,
  onPointerLeave,
}) => {
  return (
    <div className={styles.Card}>
      <button
        onClick={onClick}
        className={styles.Button}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        <div className={className}>
          {children}
        </div>
      </button>
    </div>
  );
};

export default Card;
