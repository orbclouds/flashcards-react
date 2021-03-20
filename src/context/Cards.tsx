import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import type {
  FC,
  MouseEventHandler,
  FormEventHandler,
} from 'react';

export type VisibleSide =
  | 'front'
  | 'back';

export interface Card
  extends Record<string, string> {
  front: string;
  back: string;
  id: string;
}

type CardUpdater = (
  id: string,
  side: VisibleSide
) => FormEventHandler;

type CardDeleter = (
  id: string
) => FormEventHandler;

interface CardsAPI {
  cards: Card[];
  updateCard: CardUpdater;
  deleteCard: CardDeleter;
  addCard: MouseEventHandler;
}

interface SelectionRange {
  target: Node | null;
  position: number;
}

const DEFAULT_CARDS: Card[] = [] as Card[];

const Cards = createContext<CardsAPI>({
  cards: DEFAULT_CARDS,
  deleteCard: () => () => {},
  updateCard: () => () => {},
  addCard: () => {},
});

export const useCards = () =>
  useContext(Cards);

const CardsProvider: FC = ({
  children,
}) => {
  const isFirstRender = useRef(true);
  const selection = useRef<SelectionRange>(
    {
      target: null,
      position: 0,
    }
  );
  const [cards, setCards] = useState<
    Card[]
  >(DEFAULT_CARDS);

  const addCard = useCallback(() => {
    setCards((prev) => [
      {
        id: btoa(
          crypto
            .getRandomValues(
              new Uint8Array(2)
            )
            .join('')
        ),
        front: 'Front of new card',
        back: 'Back of new card',
      },
      ...prev,
    ]);
  }, []);

  const updateCard: CardUpdater = useCallback(
    (
      id: string,
      side: VisibleSide
    ) => ({ currentTarget }) => {
      if (!currentTarget) return;
      const {
        innerText,
      } = currentTarget as HTMLDivElement;
      selection.current.target = currentTarget;
      selection.current.position =
        innerText.length;
      setCards((prev) =>
        prev.map((item) => {
          if (item.id !== id)
            return item;
          return {
            ...item,
            [side]: innerText,
          };
        })
      );
    },
    []
  );

  const deleteCard = useCallback(
    (id: string) => () => {
      setCards((prev) =>
        prev.filter(
          ({ id: prevID }) =>
            id !== prevID
        )
      );
    },
    []
  );

  useEffect(() => {
    const sel = window.getSelection();
    const range = document.createRange();
    if (
      !sel ||
      !selection.current.target
    )
      return;
    range.setStart(
      selection.current.target
        .childNodes[0],
      selection.current.position
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }, [cards]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const persisted = localStorage.getItem(
        'cards'
      );

      if (!persisted) return;

      try {
        setCards(JSON.parse(persisted));
      } catch (e) {
        console.error(e);
        alert(
          'Found cards, but failed to load them!'
        );
      }
    } else {
      try {
        const serialized = JSON.stringify(
          cards
        );
        localStorage.setItem(
          'cards',
          serialized
        );
      } catch (e) {
        console.error(e);
        alert('Failed to save cards!');
      }
    }
  }, [cards, isFirstRender.current]);

  return (
    <Cards.Provider
      value={{
        cards,
        addCard,
        updateCard,
        deleteCard,
      }}
    >
      {children}
    </Cards.Provider>
  );
};

export default CardsProvider;
