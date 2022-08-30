import React from "react";
import { DependencyList, useCallback, useRef, useRef } from "react";

type ExtractProps<T extends React.FC<any>> = Parameters<T>["0"];
type ExtractClassProps<T extends React.Component<any, any>> =
  T extends React.Component<infer X> ? X : never;

type ExtractHandlers<T> = {
  [K in keyof T]-?: T[K] extends Function | undefined ? K : never;
}[keyof T];

type AnyFunctionalComponent =
  | React.FunctionComponent<any>
  | React.VoidFunctionComponent<any>;

type ComponentOrList =
  | keyof JSX.IntrinsicElements
  | AnyFunctionalComponent
  | React.Component;

type HandlerProperty<T extends ComponentOrList> =
  T extends keyof JSX.IntrinsicElements
    ? ExtractHandlers<JSX.IntrinsicElements[T]>
    : T extends AnyFunctionalComponent
    ? ExtractHandlers<ExtractProps<T>>
    : T extends React.Component
    ? ExtractHandlers<ExtractClassProps<T>>
    : never;

type Handler<
  T extends ComponentOrList,
  TProp extends HandlerProperty<T>
> = T extends keyof JSX.IntrinsicElements
  ? TProp extends keyof JSX.IntrinsicElements[T]
    ? JSX.IntrinsicElements[T][TProp]
    : never
  : T extends AnyFunctionalComponent
  ? TProp extends keyof ExtractProps<T>
    ? ExtractProps<T>[TProp]
    : never
  : T extends React.Component
  ? TProp extends keyof ExtractClassProps<T>
    ? ExtractClassProps<T>[TProp]
    : never
  : never;

export const useHandler = <
  T extends ComponentOrList,
  TProp extends HandlerProperty<T>,
  THandler extends Handler<T, TProp> = Handler<T, TProp>
>(
  callback: THandler
): THandler => {
  const ref = useRef<THandler>(callback);
  ref.current = callback;
  return useCallback((...args: any[]) => ref.current(...args), []) as THandler;
};

