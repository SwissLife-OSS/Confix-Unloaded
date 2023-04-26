/**
 * @generated SignedSource<<0550c8fb73686f5f9cf1ddaf2f14c0a5>>
 * @relayHash 09b8e9bb3978953253886783d65a9eb1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 09b8e9bb3978953253886783d65a9eb1

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ComponentsListPaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type ComponentsListPaginationQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'ComponentsList'>;
};
export type ComponentsListPaginationQuery = {
  response: ComponentsListPaginationQuery$data;
  variables: ComponentsListPaginationQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'count',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'cursor',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'search',
      },
    ],
    v1 = [
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ComponentsListPaginationQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'ComponentsList',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'ComponentsListPaginationQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'ComponentsConnection',
          kind: 'LinkedField',
          name: 'components',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'ComponentsEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Component',
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
          args: v1 /*: any*/,
          filters: ['search'],
          handle: 'connection',
          key: 'Query_components',
          kind: 'LinkedHandle',
          name: 'components',
        },
      ],
    },
    params: {
      id: '09b8e9bb3978953253886783d65a9eb1',
      metadata: {},
      name: 'ComponentsListPaginationQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '7d11a1e9c5e4ed3745e2ec3fe5aaccd4';

export default node;
