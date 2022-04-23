import { DependencyList, useCallback } from "react";
import { ExtractProps } from "./ExtractProps";

export const useHandler = <
  T extends React.FC<any>,
  TProp extends keyof ExtractProps<T>,
  THandler extends T[TProp] & ((...args: any[]) => any)
>(
  component: T,
  handler: TProp,
  callback: THandler,
  deps: DependencyList
) => useCallback(callback, deps);
