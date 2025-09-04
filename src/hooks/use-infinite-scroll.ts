import { useEffect, useRef } from "react";

type Params = {
  onIntersect?: () => void;
  disabled?: boolean;
};
export function useInfiniteScroll({
  onIntersect,
  disabled = false,
}: Params = {}) {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect?.();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [disabled]);

  return { observerTarget };
}
