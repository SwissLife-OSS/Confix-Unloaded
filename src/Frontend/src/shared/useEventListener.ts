import {DependencyList, useCallback} from 'react';

type EventsWithTargetValue = React.ChangeEvent<
  HTMLTextAreaElement | HTMLInputElement
>;
export const useIntEventHanlder = <
  T extends (value: number, e: E) => K,
  K,
  E extends EventsWithTargetValue,
>(
  callback: T,
  ...deps: DependencyList
): ((e: E) => K) =>
  useCallback((e: E) => {
    const value = parseInt(e.target.value, 10);
    return callback(value, e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

export const useStringEventHanlder = <
  T extends (value: string, e: E) => K,
  K,
  E extends EventsWithTargetValue,
>(
  callback: T,
  ...deps: DependencyList
): ((e: E) => K) =>
  useCallback((e: E) => {
    return callback(e.target.value, e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
