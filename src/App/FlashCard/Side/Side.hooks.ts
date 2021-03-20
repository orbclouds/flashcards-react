import {
  useState,
  useCallback,
} from 'react';
import type {
  MouseEventHandler,
  PointerEventHandler,
} from 'react';

interface Hooks {
  toggleClose: PointerEventHandler;
  selectAll: MouseEventHandler;
  showClose: boolean;
}

const useHooks = (): Hooks => {
  const [
    showClose,
    setShowClose,
  ] = useState(false);

  const selectAll = useCallback(() => {
    document.execCommand(
      'selectAll',
      false
    );
  }, []);

  const toggleClose = useCallback(() => {
    setShowClose((prev) => !prev);
  }, []);

  return {
    showClose,
    selectAll,
    toggleClose,
  };
};

export default useHooks;
