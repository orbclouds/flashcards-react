import React from 'react';
import type { FC } from 'react';

import { useCards } from '@app/context/Cards';

import Card from './Card';
import FlashCard from './FlashCard';

import styles from './App.module.css';

const App: FC = () => {
  const { cards, addCard } = useCards();

  return (
    <main className={styles.Container}>
      <h1>Flashcards</h1>
      <h2>
        To help you remember things...
      </h2>
      <article className={styles.Cards}>
        <Card onClick={addCard}>
          + New Card
        </Card>
        {cards.map((props, i) => (
          <FlashCard
            key={`${i}`}
            {...props}
          />
        ))}
      </article>
    </main>
  );
};

export default App;
