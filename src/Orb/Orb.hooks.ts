import {
  useState,
  useEffect,
} from 'react';

interface Hooks {
  show: boolean;
}

const useHooks = (): Hooks => {
  const [show, setShow] = useState(
    false
  );

  useEffect(() => {
    setShow(true);
  }, []);

  return { show };
};

export default useHooks;
