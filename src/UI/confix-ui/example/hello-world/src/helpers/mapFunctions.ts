import { mapActions, mapState } from "vuex";
import { Modules } from "../store/index";

export function mapStateOfNamespace<
  T extends keyof Modules,
  TState extends keyof Modules[T]["state"]
>(
  namespace: T,
  state: TState
): {
  [K in TState]: () => Modules[T]["state"][TState];
} {
  return mapState(namespace, state as any) as any;
}

export function mapActionOfNamespace<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
>(
  namespace: T,
  action: TState
): {
  [K in TState]: OmitFirstArg<Modules[T]["actions"][TState]>;
} {
  return mapActions(namespace, action as any) as any;
}
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
