/**
 * @generated SignedSource<<c969a13b7f6fbf703b7d030ef0eab3c3>>
 * @relayHash 61e0d5dad6f516727af4c1aea94cee9b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 61e0d5dad6f516727af4c1aea94cee9b

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type RolesListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type RolesListQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'RolesList'>;
};
export type RolesListQuery = {
  response: RolesListQuery$data;
  variables: RolesListQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'count',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'cursor',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'search',
    },
    v3 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
      },
      {
        kind: 'Variable',
        name: 'search',
        variableName: 'search',
      },
    ];
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'RolesListQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'RolesList',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'RolesListQuery',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'SearchRolesConnection',
          kind: 'LinkedField',
          name: 'searchRoles',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'SearchRolesEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Role',
                  kind: 'LinkedField',
                  name: 'node',
                  plural: false,
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
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__typename',
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'cursor',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'PageInfo',
              kind: 'LinkedField',
              name: 'pageInfo',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'endCursor',
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'hasNextPage',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: v3 /*: any*/,
          filters: ['search'],
          handle: 'connection',
          key: 'Query_searchRoles',
          kind: 'LinkedHandle',
          name: 'searchRoles',
        },
      ],
    },
    params: {
      id: '61e0d5dad6f516727af4c1aea94cee9b',
      metadata: {},
      name: 'RolesListQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '883489d0c13930a717cd3341a25b4c1f';

export default node;
