/**
 * @generated SignedSource<<b20a0aa41b9f6605e3236f3656912560>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApiKey_RoleScopeSection$data = {
  readonly id: string;
  readonly name: string;
  readonly roles: ReadonlyArray<{
    readonly namespace: string;
    readonly roles: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  }>;
  readonly ' $fragmentType': 'EditApiKey_RoleScopeSection';
};
export type EditApiKey_RoleScopeSection$key = {
  readonly ' $data'?: EditApiKey_RoleScopeSection$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApiKey_RoleScopeSection'>;
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
    name: 'EditApiKey_RoleScopeSection',
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
    type: 'ApiKey',
    abstractKey: null,
  };
})();

(node as any).hash = '811acc5bc102c71de4378a12a99d507f';

export default node;
