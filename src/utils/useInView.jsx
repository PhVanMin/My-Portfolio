import { useState, useEffect, useRef } from "react";

function useInView({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  triggerOnce = false,
} = {}) {
  const elementRef = useRef(null);
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    if (elementRef.current === null) return;

    const options = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold,
    };

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (triggerOnce && !isInView) {
          observer.unobserve(elementRef.current);
          elementRef.current = null;
        }
      } else {
        setInView(false);
      }
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return { ref: elementRef, isInView: isInView };
}

export { useInView };
