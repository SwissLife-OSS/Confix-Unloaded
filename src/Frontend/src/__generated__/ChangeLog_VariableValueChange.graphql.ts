/**
 * @generated SignedSource<<717a6cc82de0ff60969b8be407d432ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ChangeLog_VariableValueChange$data = {
  readonly variable: {
    readonly name: string;
  } | null;
  readonly ' $fragmentType': 'ChangeLog_VariableValueChange';
};
export type ChangeLog_VariableValueChange$key = {
  readonly ' $data'?: ChangeLog_VariableValueChange$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog_VariableValueChange'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ChangeLog_VariableValueChange',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'Variable',
      kind: 'LinkedField',
      name: 'variable',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'name',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: 'VariableValueChange',
  abstractKey: null,
};

(node as any).hash = '89c79d62c978b8fb03dcbb92abeaa550';

export default node;
