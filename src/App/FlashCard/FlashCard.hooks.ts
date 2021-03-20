import {
  useState,
  useCallback,
} from 'react';
import type {
  MouseEventHandler,
  PointerEventHandler,
  MouseEvent as ReactMouseEvent,
} from 'react';

import type { VisibleSide } from '@app/context/Cards';

interface Hooks {
  showTip: boolean;
  flip: MouseEventHandler;
  visibleSide: VisibleSide;
  toggleTip: PointerEventHandler;
}

const useHooks = (): Hooks => {
  const [
    showTip,
    setShowTip,
  ] = useState(false);
  const [
    visibleSide,
    setVisibleSide,
  ] = useState<VisibleSide>(
    'front' as const
  );

  const toggleTip = useCallback(() => {
    setShowTip((prev) => !prev);
  }, []);

  const flip = useCallback(
    ({
      target,
      currentTarget,
    }: ReactMouseEvent<
      HTMLDivElement,
      MouseEvent
    >) => {
      if (target !== currentTarget)
        return;
      setVisibleSide((prev) =>
        prev === 'front'
          ? ('back' as const)
          : ('front' as const)
      );
    },
    []
  );

  return {
    flip,
    showTip,
    toggleTip,
    visibleSide,
  };
};

export default useHooks;
