import { useEffect, useRef } from 'react';

const useWatch = <T = any>(callback: (newValue: T, prevValue: T | undefined) => void, value: T) => {
  const prevValue = useRef<T | undefined>(undefined);
  useEffect(() => {
    callback(value, prevValue.current);
    if (prevValue.current !== value) {
      prevValue.current = value;
    }
  }, [value]);
};

export default useWatch;
