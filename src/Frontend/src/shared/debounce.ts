import {useCallback} from 'react';

export function debounce<T extends (...args: any[]) => any>(
  cb: T,
  wait = 20,
): T {
  let h: NodeJS.Timeout | undefined = undefined;
  let callable = (...args: any): any => {
    if (h) {
      clearTimeout(h);
    }
    h = setTimeout(() => cb(...args), wait);
  };
  return callable as any;
}

export function useDebounce<T extends (...args: any[]) => any>(
  cb: T,
  wait = 20,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(debounce(cb, wait), [debounce, cb]);
}
