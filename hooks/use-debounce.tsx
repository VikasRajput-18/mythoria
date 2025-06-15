import { useEffect, useState } from "react";

type DebounceProps<T> = {
  value: T;
  delay: number;
};

export default function useDebounce<T>({ value, delay }: DebounceProps<T>) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
