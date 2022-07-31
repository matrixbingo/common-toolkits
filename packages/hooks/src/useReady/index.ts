import { useEffect } from 'react';

export interface ReadyOptions { ready?: () => void }

/**
 * isReady 为真时执行
 * @param fn
 * @param options
 */
const useReady = (isReady: boolean, options: ReadyOptions) => {
  const { ready } = options;
  useEffect(() => {
    if (isReady) {
      ready?.();
    }
  }, [isReady]);
};

export default useReady;
