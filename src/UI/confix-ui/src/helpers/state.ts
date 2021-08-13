export function value<T>(v: T): T {
  return v;
}

export function array<T>(v?: T[]): T[] {
  return v ?? [];
}

export function maybeNull<T>(): T | null {
  return null;
}

export function prop<T>(): () => T {
  return () => null!;
}
