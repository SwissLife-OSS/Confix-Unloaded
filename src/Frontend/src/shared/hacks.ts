/**
 * Constructs a  by accessing to deep properties and ignoring nullish in the path.
 *
 * @example
 * type Baz = Lookup<{
 *   foo: Array<{
 *     bar?: string | null;
 *     baz: {
 *       quz: string | null;
 *     };
 *   }> | null;
 * } | null, 'foo', number, 'baz'>;
 */
export type Lookup<
  T extends object | null | undefined,
  K1 extends keyof NN<T> = never,
  K2 extends keyof NN<NN<T>[K1]> = never,
  K3 extends keyof NN<NN<NN<T>[K1]>[K2]> = never,
  K4 extends keyof NN<NN<NN<NN<T>[K1]>[K2]>[K3]> = never,
  K5 extends keyof NN<NN<NN<NN<NN<T>[K1]>[K2]>[K3]>[K4]> = never
> = [K5] extends [never]
  ? [K4] extends [never]
    ? [K3] extends [never]
      ? [K2] extends [never]
        ? [K1] extends [never]
          ? T
          : NN<T>[K1]
        : NN<NN<T>[K1]>[K2]
      : NN<NN<NN<T>[K1]>[K2]>[K3]
    : NN<NN<NN<NN<T>[K1]>[K2]>[K3]>[K4]
  : NN<NN<NN<NN<NN<T>[K1]>[K2]>[K3]>[K4]>[K5];

export type NN<T> = NonNullable<T>;

/**
 * Constructs a type by excluding deeply all nullish in the path.
 *
 * @example
 * type Baz = NoNullables<{
 *   foo: Array<{
 *     bar?: string | null;
 *     baz: {
 *       quz: string | null;
 *     };
 *   }> | null;
 * } | null>['foo'][number]['bar']['baz'];
 */
export type NoNullables<T extends object | null> = NoNullablesRecursive<T>;

export type NoNullablesRecursive<T, U = NonNullable<T>> = U extends Array<
  infer A
>
  ? Array<NoNullablesRecursive<A>>
  : U extends ReadonlyArray<infer B>
  ? ReadonlyArray<NoNullablesRecursive<B>>
  : U extends object
  ? { [P in keyof U]: NoNullablesRecursive<U[P]> }
  : T;

/**
 * Constructs a type by excluding deeply all fragment references (i.e., `$fragmentRefs` and `$refType`).
 * @see https://github.com/relay-tools/relay-compiler-language-typescript/issues/29#issuecomment-417267049
 *
 * @example
 * type MyType = NoFragmentRefs<{
 *   foo: Array<{
 *     bar?: string | null;
 *     ' $fragmentRefs': 'nope';
 *   }> | null;
 *   ' $refType': 'nope';
 * }>;
 */
export type NoFragmentRefs<T extends object> = OmitRecursive<
  T,
  " $fragmentRefs" | " $refType"
>;

export type OmitRecursive<T, K> = T extends Array<infer A>
  ? Array<Identity<OmitRecursive<A, K>>>
  : T extends ReadonlyArray<infer B>
  ? ReadonlyArray<Identity<OmitRecursive<B, K>>>
  : T extends object
  ? Identity<Ignore<{ [P in keyof T]: OmitRecursive<T[P], K> }, K>>
  : T;

export type Ignore<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Identity<T> = T extends object ? { [P in keyof T]: T[P] } : T;

/**
 * Construct a type by deeply excluding all readonlies in the path.
 *
 * @example
 * type Baz = DeepWritable<{
 *   readonly foo: Array<{
 *     readonly bar?: string | null;
 *     readonly baz: {
 *       readonly quz: string | null;
 *     };
 *   }>;
 * }>
 */
export type DeepWriteable<T> = {
  -readonly [P in keyof T]: DeepWriteable<T[P]>;
};
