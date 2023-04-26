/**
 * @generated SignedSource<<cb789e47aa8bb8b1e8a93ee588ee593f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditGroup_RoleScopeSection$data = {
  readonly id: string;
  readonly name: string;
  readonly roles: ReadonlyArray<{
    readonly namespace: string;
    readonly roles: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  }>;
  readonly ' $fragmentType': 'EditGroup_RoleScopeSection';
};
export type EditGroup_RoleScopeSection$key = {
  readonly ' $data'?: EditGroup_RoleScopeSection$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditGroup_RoleScopeSection'>;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    };
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'EditGroup_RoleScopeSection',
    selections: [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'RoleScope',
        kind: 'LinkedField',
        name: 'roles',
        plural: true,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'namespace',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Role',
            kind: 'LinkedField',
            name: 'roles',
            plural: true,
            selections: [v0 /*: any*/, v1 /*: any*/],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Group',
    abstractKey: null,
  };
})();

(node as any).hash = '08a27c08757d2447d8a1e4a2252be1ea';

export default node;
