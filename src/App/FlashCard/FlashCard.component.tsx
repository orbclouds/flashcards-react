import React from 'react';
import type { FC } from 'react';

import type { Card as CardType } from '@app/context/Cards';

import Side from './Side';
import Card from '../Card';

import useHooks from './FlashCard.hooks';
import styles from './FlashCard.module.css';

interface Props extends CardType {}

const FlashCard: FC<Props> = ({
  id,
  front,
  back,
}) => {
  const {
    flip,
    showTip,
    toggleTip,
    visibleSide,
  } = useHooks();

  return (
    <Card
      className={
        styles[
          `Card--show-${visibleSide}`
        ]
      }
      onPointerEnter={toggleTip}
      onPointerLeave={toggleTip}
    >
      <Side
        id={id}
        flip={flip}
        side="front"
        value={front}
        showTip={showTip}
      />
      <Side
        id={id}
        flip={flip}
        side="back"
        value={back}
        showTip={showTip}
      />
    </Card>
  );
};

export default FlashCard;
