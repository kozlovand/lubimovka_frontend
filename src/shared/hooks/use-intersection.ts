import { useEffect, useRef, useState, useCallback, RefCallback } from 'react';

import { Nullable } from 'shared/types';

export const useIntersection = <T extends Element>(options?: IntersectionObserverInit) => {
  const observerRef = useRef<IntersectionObserver>();
  const [targetNode, setTargetNode] = useState<Nullable<T>>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const targetRefCallback: RefCallback<T> = (node) => {
    if (node !== null) {
      setTargetNode(node);
    }
  };

  const targetRef = useCallback(targetRefCallback, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    setIsIntersecting(entries.some(({ isIntersecting }) => isIntersecting));
  };

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(handleIntersection, options);
    };
  }, [options]);

  useEffect(() => {
    const observer = observerRef.current;

    if (!observer || targetNode === null) {
      return;
    };

    setIsIntersecting(false);
    observer.disconnect();
    observer.observe(targetNode);

    return () => {
      observer.disconnect();
    };
  }, [targetNode]);

  return <const>[targetRef, isIntersecting];
};
