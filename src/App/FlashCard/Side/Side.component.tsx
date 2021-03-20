import React from 'react';
import type {
  FC,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';

import { useCards } from '@app/context/Cards';
import type {
  VisibleSide,
  Card as CardType,
} from '@app/context/Cards';

import useHooks from './Side.hooks';
import styles from './Side.module.css';

type UnionProps = HTMLAttributes<HTMLDivElement> &
  Pick<CardType, 'id'>;

interface Props extends UnionProps {
  flip: MouseEventHandler;
  side: VisibleSide;
  showTip: boolean;
  value: string;
}

const Side: FC<Props> = ({
  id,
  flip,
  side,
  value,
  showTip,
}) => {
  const {
    updateCard,
    deleteCard,
  } = useCards();
  const {
    showClose,
    selectAll,
    toggleClose,
  } = useHooks();

  return (
    <div
      onClick={flip}
      onPointerEnter={toggleClose}
      onPointerLeave={toggleClose}
      className={
        styles[`Card--${side}`]
      }
    >
      {showTip && (
        <div className={styles.Tip}>
          Click to flip!
        </div>
      )}
      <div
        contentEditable
        onClick={selectAll}
        className={styles.Content}
        onInput={updateCard(id, side)}
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      />
      {showClose && (
        <button
          className={styles.Close}
          onClick={deleteCard(id)}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Side;
