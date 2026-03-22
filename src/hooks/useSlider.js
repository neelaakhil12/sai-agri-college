import { useState, useEffect, useCallback } from "react";

export function useSlider(total, interval = 5200) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (n) => setCurrent((n + total) % total),
    [total]
  );
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), interval);
    return () => clearInterval(id);
  }, [current, goTo, interval]);

  return { current, goTo, prev, next };
}
