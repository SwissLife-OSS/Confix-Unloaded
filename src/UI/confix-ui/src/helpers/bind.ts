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
        return commit(action, ...args);
      },
    }),
    action: (namespace: string, mutation: string) => ({
      dispatch: (payload: Any) => {
        return dispatch(`${namespace}/${mutation}`, payload);
      },
      dispatchWithOptions: (payload: Any, options: Any) => {
        return dispatch(`${namespace}/${mutation}`, payload, options);
      },
      rootDispatch: (payload: Any) => {
        return dispatch(`${namespace}/${mutation}`, payload);
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
  ): {
    dispatchWithOptions: CommitBoundWithOptions<T, TState>;
    dispatch: CommitBound<T, TState>;
    rootDispatch: CommitBound<T, TState>;
  };
}
type DispatchBound<
  T extends keyof Modules,
  TState extends keyof Modules[T]["mutations"]
> = (
  payload: GetParameter<Modules[T]["mutations"][TState]>
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
  payload: GetParameter<Modules[T]["actions"][TState]>
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

type CommitBoundWithOptions<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = Modules[T]["actions"][TState] extends (x: Any, args: infer P) => Any
  ? P extends Scalars
    ? ComitBoundToActionWithOptions<T, TState>
    : ComitBoundToActionOptionalWithOptions<T, TState>
  : never;
type ComitBoundToActionWithOptions<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = (
  payload: GetParameter<Modules[T]["actions"][TState]>,
  options?: DispatchOptions
) => GetReturnType<Modules[T]["actions"][TState]>;
type ComitBoundToActionOptionalWithOptions<
  T extends keyof Modules,
  TState extends keyof Modules[T]["actions"]
> = (options?: DispatchOptions) => GetReturnType<Modules[T]["actions"][TState]>;
