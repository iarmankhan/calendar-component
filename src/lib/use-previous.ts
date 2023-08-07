import { useState } from "react";

export function usePrevious<T>(value: T) {
  const [tuple, setTuple] = useState<[T | null, T]>([null, value]);

  if (tuple[1] !== value) {
    setTuple([tuple[1], value]);
  }

  return tuple[0] || value;
}
