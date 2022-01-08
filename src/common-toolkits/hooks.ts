import { useInterval } from 'ahooks';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';

/**
 * 可恢复初始状态
 * @param initialState
 * @returns
 */
export const useResetState = <S>( initialState: S ): [S, Dispatch<SetStateAction<S>>, () => void] => {
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);
  return [state, setState, resetState];
};

/**
 * 间隔delay运行，直到满足close条件，运行一次fn
 * @param fn
 * @param options
 */
export const useIntervalDelay = ( fn: () => void, options: { close: () => boolean; delay?: number } ) => {
  const { close, delay = 1000 } = options;
  const [interval, setInterval] = useState<number | undefined>(delay);
  useInterval(() => {
    if (close()) {
      fn();
      setInterval(undefined);
    }
  }, interval);
};

/**
 * useRequest 并行请求
 * @param loadings
 * @returns
 */
export const useParallel = ( ...loadings: boolean[] ): { readonly loading: boolean; readonly ready: boolean } => {
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

