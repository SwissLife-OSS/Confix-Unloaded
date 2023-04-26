/**
 * @generated SignedSource<<140fd1bdd80847e9e0a947293d181196>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditVariable_VariableChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog'>;
  }>;
  readonly ' $fragmentType': 'EditVariable_VariableChangeLog';
};
export type EditVariable_VariableChangeLog$key = {
  readonly ' $data'?: EditVariable_VariableChangeLog$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditVariable_VariableChangeLog'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditVariable_VariableChangeLog',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'ChangeLog',
      kind: 'LinkedField',
      name: 'changeLog',
      plural: true,
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'ChangeLog',
        },
      ],
      storageKey: null,
    },
  ],
  type: 'Variable',
  abstractKey: null,
};

(node as any).hash = '1d4ddcee90523bc8c1e8598a8fd7e327';

export default node;
