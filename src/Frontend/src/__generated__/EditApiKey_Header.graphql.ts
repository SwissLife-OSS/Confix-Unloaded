/**
 * @generated SignedSource<<31b2bd532899445b1b287670dcabd189>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApiKey_Header$data = {
  readonly name: string;
  readonly ' $fragmentType': 'EditApiKey_Header';
};
export type EditApiKey_Header$key = {
  readonly ' $data'?: EditApiKey_Header$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApiKey_Header'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditApiKey_Header',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
  ],
  type: 'ApiKey',
  abstractKey: null,
};

(node as any).hash = 'e13b113159ec6cc90f7d64d0c711e1e0';

export default node;
