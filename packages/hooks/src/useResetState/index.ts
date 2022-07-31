import { Dispatch, SetStateAction, useState } from 'react';

/**
 * 可恢复初始状态
 * @param initialState
 * @returns
 */
const useResetState = <S>( initialState: S ): [S, Dispatch<SetStateAction<S>>, () => void] => {
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);
  return [state, setState, resetState];
};

export default useResetState;
