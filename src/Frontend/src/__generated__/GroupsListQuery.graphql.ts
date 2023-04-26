/**
 * @generated SignedSource<<204bed476b235460c08b8767ff72e392>>
 * @relayHash c47f09a894f6a3321d646fc19eaa96b7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c47f09a894f6a3321d646fc19eaa96b7

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type GroupsListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type GroupsListQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'GroupsList'>;
};
export type GroupsListQuery = {
  response: GroupsListQuery$data;
  variables: GroupsListQuery$variables;
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
      name: 'GroupsListQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'GroupsList',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'GroupsListQuery',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'SearchGroupsConnection',
          kind: 'LinkedField',
          name: 'searchGroups',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'SearchGroupsEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Group',
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
          key: 'Query_searchGroups',
          kind: 'LinkedHandle',
          name: 'searchGroups',
        },
      ],
    },
    params: {
      id: 'c47f09a894f6a3321d646fc19eaa96b7',
      metadata: {},
      name: 'GroupsListQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '6211bf18318b03c27dabad887ed17733';

export default node;
