import { Any } from "./Any";

export type Scalars =
  | Record<string, unknown>
  | number
  | string
  | Any[]
// eslint-disable-next-line @typescript-eslint/ban-types
  | object;
