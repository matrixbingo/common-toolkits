import { useInterval } from 'ahooks';
import { useState } from 'react';

/**
 * 间隔delay运行，直到满足close条件，运行一次fn
 * @param fn
 * @param options
 */
const useIntervalDelay = ( fn: () => void, options: { close: () => boolean; delay?: number } ) => {
  const { close, delay = 1000 } = options;
  const [interval, setInterval] = useState<number | undefined>(delay);
  useInterval(() => {
    if (close()) {
      fn();
      setInterval(undefined);
    }
  }, interval);
};

export default useIntervalDelay;
