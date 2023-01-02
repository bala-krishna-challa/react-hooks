import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type LazyInitializer<T> = () => T;

type DefaultValue<T> = T | LazyInitializer<T>;

function getLazilyInitializedValue<T>(
  key: string,
  defaultValue: DefaultValue<T>
) {
  const storedVal = sessionStorage.getItem(key);

  if (storedVal) {
    return JSON.parse(storedVal) as T;
  }

  return typeof defaultValue === 'function'
    ? (defaultValue as LazyInitializer<T>)()
    : defaultValue;
}

function useLocalStorageState<T>(
  key: string,
  defaultValue: DefaultValue<T>
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    return getLazilyInitializedValue(key, defaultValue);
  });
  const keyRef = useRef(key);

  useEffect(() => {
    if (keyRef.current !== key) {
      sessionStorage.removeItem(keyRef.current);
      keyRef.current = key;
    }
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
