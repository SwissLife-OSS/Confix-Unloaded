import {useCallback, DependencyList} from 'react';

export const useMultiplexer = <TArgs>(
  fns: ((...a: TArgs[]) => void)[],
  deps: DependencyList,
): ((...a: TArgs[]) => void) => {
  return useCallback((...a) => {
    fns.forEach((x) => x(...a));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
