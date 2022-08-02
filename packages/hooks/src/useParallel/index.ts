import { useMemo, useRef } from 'react';

/**
 * useRequest 并行请求
 * @param loadings
 * @returns
 */
const useParallel = ( ...loadings: boolean[] ): { readonly loading: boolean; readonly ready: boolean } => {
  const loading = useMemo(() => loadings.every((_loading) => _loading), [loadings] );
  const arr = useMemo(() => Array(loadings.length).fill(0), []);
  const prevRef = useRef<boolean[]>();
  const curRef = useRef<boolean[]>();

  const shouldUpdate = (preLoadings: boolean[], curLoadings: boolean[]) => {
    if (preLoadings.length !== curLoadings.length) return true;
    return preLoadings.some((v, i) => curLoadings[i] !== v);
  };

  const update = () => {
    prevRef.current?.forEach((v, i) => {
      if (v === false && curRef.current?.[i] === true) {
        arr[i] = 1;
      }
      if (v === true && curRef.current?.[i] === false) {
        arr[i] = 2;
      }
    });
  };

  if (shouldUpdate(curRef.current || [], loadings)) {
    prevRef.current = curRef.current;
    curRef.current = loadings;
    update();
  }

  const ready = arr.every((i) => i === 2);

  return { loading, ready } as const;
};

export default useParallel;
