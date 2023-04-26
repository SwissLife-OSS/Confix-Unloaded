/**
 * @generated SignedSource<<d5a125228d5753e65f3057b258cf1ff8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ChangeLog_RemoveComponentChange$data = {
  readonly component: {
    readonly name: string;
  } | null;
  readonly ' $fragmentType': 'ChangeLog_RemoveComponentChange';
};
export type ChangeLog_RemoveComponentChange$key = {
  readonly ' $data'?: ChangeLog_RemoveComponentChange$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog_RemoveComponentChange'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ChangeLog_RemoveComponentChange',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'Component',
      kind: 'LinkedField',
      name: 'component',
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
  type: 'RemoveComponentChange',
  abstractKey: null,
};

(node as any).hash = '8292bcf87fc3812c488168a9e8bd3713';

export default node;
