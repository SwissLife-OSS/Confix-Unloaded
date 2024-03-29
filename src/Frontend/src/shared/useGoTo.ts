import {useCallback} from 'react';
import {generatePath, NavigateOptions, useNavigate} from 'react-router';

export const useGoTo = <
  T extends ((...args: any[]) => string | undefined) | (string | undefined),
>(
  cb: T,
  options: NavigateOptions | undefined = undefined,
  params: Record<string, string> | undefined = undefined,
): T extends (...args: any[]) => string | undefined
  ? (...args: Parameters<T>) => void
  : () => void => {
  const navigate = useNavigate();
  const handleAdd = useCallback(
    (...args: any) => {
      let url: string | undefined = undefined;
      if (cb instanceof Function) {
        url = cb(...args);
      } else {
        url = cb;
      }
      if (url) {
        if (params) {
          url = generatePath(url, params);
        }
        navigate(url, options);
      }
    },
    [navigate, cb, options, params],
  );

  return handleAdd as any;
};
