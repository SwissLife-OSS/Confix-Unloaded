/**
 * @generated SignedSource<<b1727bfb4f03ee7074c28e9d9157bee7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ChangeLog_RenameComponentChange$data = {
  readonly component: {
    readonly name: string;
  } | null;
  readonly ' $fragmentType': 'ChangeLog_RenameComponentChange';
};
export type ChangeLog_RenameComponentChange$key = {
  readonly ' $data'?: ChangeLog_RenameComponentChange$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog_RenameComponentChange'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ChangeLog_RenameComponentChange',
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
  type: 'RenameComponentChange',
  abstractKey: null,
};

(node as any).hash = '312c423b6de092d2a86fd3a97d5776dd';

export default node;
