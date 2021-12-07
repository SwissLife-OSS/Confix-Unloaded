import { useCallback, useRef } from "react";
import { LoadMoreFn } from "react-relay";
import { OperationType } from "relay-runtime";

export const useLoadNextChain = <T extends OperationType>(
  loadNext: LoadMoreFn<T>,
  count: number = 20
) => {
  const promiseRef = useRef(Promise.resolve());
  return useCallback(() => {
    promiseRef.current = promiseRef.current.then(() => {
      return new Promise((res, rej) => {
        loadNext(count, {
          onComplete: (e) => {
            if (e) {
              rej(e.message);
            } else {
              res();
            }
          },
        });
      });
    });
  }, [loadNext, count]);
};
