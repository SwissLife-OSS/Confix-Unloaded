/**
 * @generated SignedSource<<bc0dc68d98e85e9a17db2fb3666ff093>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditRole_Header$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'EditRole_Header';
};
export type EditRole_Header$key = {
  readonly ' $data'?: EditRole_Header$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditRole_Header'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditRole_Header',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
  ],
  type: 'Role',
  abstractKey: null,
};

(node as any).hash = '44801fcf47d502233a3cba43b461b81d';

export default node;
