/**
 * @generated SignedSource<<b7cff4f823513f75cdc2ddd886241794>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditGroup_Header$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'EditGroup_Header';
};
export type EditGroup_Header$key = {
  readonly ' $data'?: EditGroup_Header$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditGroup_Header'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditGroup_Header',
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
  type: 'Group',
  abstractKey: null,
};

(node as any).hash = 'fb8049806fd7a0d035ab1b2075bcd1a6';

export default node;
