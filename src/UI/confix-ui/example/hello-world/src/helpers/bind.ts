import { ActionContext, CommitOptions, DispatchOptions, Store } from "vuex";
import { Modules } from "../store";
import { Any } from "./Any";
import { Scalars } from "./Scalars";
export function useModules<
  S,
  R,
  TContext extends Store<S> | ActionContext<S, R>
>(context: TContext): BoundContext & Omit<TContext, "commit" | "dispatch"> {
  const { commit, dispatch, ...other } = context;
  return {
    ...other,
    mutate: (namespace: string, action: string) => ({
      commit: (...args: Any[]) => {
        if (args.length > 1) {
          return commit(action, args[0], args[1]);
        }
        return commit(action, undefined, args[0]);
      },
    }),
    action: (namespace: string, mutation: string) => ({
      dispatch: (...args: Any[]) => {
        if (args.length > 1) {
          return dispatch(`${namespace}/${mutation}`, args[0], args[1]);
        }
        return dispatch(`${namespace}/${mutation}`, undefined, args[0]);
      },
      rootDispatch: (...args: Any[]) => {
        if (args.length > 1) {
          return dispatch(
            `${namespace}/${mutation}`,
            args[0],
            Object.assign({ root: true }, args[1] ?? {})
          );
        }
        return dispatch(
          `${namespace}/${mutation}`,
          undefined,
          Object.assign({ root: true }, args[0] ?? {})
        );
      },
    }),
  } as Any;
}
interface BoundContext {
  mutate<T extends keyof Modules, TState extends keyof Modules[T]["mutations"]>(
    namespace: T,
    action: TState
  ): { commit: DispatchBound<T, TState> };
  action<T extends keyof Modules, TState extends keyof Modules[T]["actions"]>(
    namespace: T,
    action: TState
  ): { dispatch: CommitBound<T, TState>; rootDispatch: CommitBound<T, TState> };
}
type DispatchBound<
  T extends keyof Modules,
  TState extends keyof Modules[T]["mutations"]
> = (
  payload: GetParameter<Modules[T]["mutations"][TState]>,
  options?: CommitOptions
) => GetReturnType<Modules[T]["mutations"][TState]>;
type CommitBound<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = Modules[T]["actions"][TState] extends (x: Any, args: infer P) => Any
  ? P extends Scalars
    ? ComitBoundToAction<T, TState>
    : ComitBoundToActionOptional<T, TState>
  : never;
type ComitBoundToAction<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = (
  payload: GetParameter<Modules[T]["actions"][TState]>,
  options?: DispatchOptions
) => GetReturnType<Modules[T]["actions"][TState]>;
type ComitBoundToActionOptional<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = (options?: DispatchOptions) => GetReturnType<Modules[T]["actions"][TState]>;
type GetParameter<F> = F extends (x: Any, args: infer P) => infer R
  ? P extends Scalars
    ? P
    : undefined
  : null;
type GetReturnType<F> = F extends (...args: Any) => infer R ? R : unknown;
