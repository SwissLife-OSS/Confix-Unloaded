/**
 * @generated SignedSource<<6cfd0a497bed0253e6bf5f650880013e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationPartChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog'>;
  }>;
  readonly ' $fragmentType': 'ApplicationPartChangeLog';
};
export type ApplicationPartChangeLog$key = {
  readonly ' $data'?: ApplicationPartChangeLog$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationPartChangeLog'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ApplicationPartChangeLog',
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
  type: 'ApplicationPart',
  abstractKey: null,
};

(node as any).hash = '14af544550086729d1221fb6e806c947';

export default node;
