/**
 * @generated SignedSource<<19756bfb0b3d718bd9be78cdf42cb965>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplication_ApplicationChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog'>;
  }>;
  readonly ' $fragmentType': 'EditApplication_ApplicationChangeLog';
};
export type EditApplication_ApplicationChangeLog$key = {
  readonly ' $data'?: EditApplication_ApplicationChangeLog$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApplication_ApplicationChangeLog'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditApplication_ApplicationChangeLog',
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
  type: 'Application',
  abstractKey: null,
};

(node as any).hash = '2949cfb6d5c9d5c14ad297d50257bc35';

export default node;
