import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export function useGoTo<T extends (...args: any[]) => string>(cb: T): T {
  const history = useHistory();
  const handleAdd = useCallback(
    (...args) => {
      history.push(cb(...args));
    },
    [history, cb]
  );
  return handleAdd as T;
}
