import { useState, useEffect } from "react";

export function useIntersectionObserver(target, options) {
  const [intersecting, setIntersecting] = useState();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setIntersecting(entries[0].isIntersecting);
      // console.log(entries[0].isIntersecting);
      options.onIntersect(entries[0].isIntersecting);
    }, options);
    observer.observe(target.current);

    return () => observer.disconnect();
  }, []);

  return intersecting;
}
