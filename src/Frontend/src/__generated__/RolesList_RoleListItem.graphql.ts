/**
 * @generated SignedSource<<e82e5071742f2b194d5c737d2b59e7e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type RolesList_RoleListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'RolesList_RoleListItem';
};
export type RolesList_RoleListItem$key = {
  readonly ' $data'?: RolesList_RoleListItem$data;
  readonly ' $fragmentSpreads': FragmentRefs<'RolesList_RoleListItem'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'RolesList_RoleListItem',
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

(node as any).hash = '95fd99c55b592dee9b455550fc47997e';

export default node;
