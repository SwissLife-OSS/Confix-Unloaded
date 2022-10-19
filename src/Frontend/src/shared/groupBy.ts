export const groupBy = <T, TKey extends string | number>(
  xs: T[],
  groupBy: (a: T) => TKey
) => {
  return xs.reduce<Record<TKey, T[]>>((reduced, current) => {
    (reduced[groupBy(current)] = reduced[groupBy(current)] || []).push(current);
    return reduced;
  }, {} as any);
};
