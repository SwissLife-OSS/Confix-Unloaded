import {groupBy} from './groupBy';

export const chunkBy = <T, TKey extends string | number>(
  xs: T[],
  chunkBy: (a: T) => TKey,
): T[][] => {
  return Object.values(groupBy(xs, chunkBy));
};
