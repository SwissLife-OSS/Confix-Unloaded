/**
 * @generated SignedSource<<cf45d72c6af5cd1e6d77d216cdfbb92d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ReaderFragment, RefetchableFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApiKeysList$data = {
  readonly apiKeys: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly ' $fragmentSpreads': FragmentRefs<'ApiKeysList_ApiKeyListItem'>;
      };
    }> | null;
  } | null;
  readonly ' $fragmentType': 'ApiKeysList';
};
export type ApiKeysList$key = {
  readonly ' $data'?: ApiKeysList$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApiKeysList'>;
};

import ApiKeysListPaginationQuery_graphql from './ApiKeysListPaginationQuery.graphql';

const node: ReaderFragment = (function () {
  var v0 = ['apiKeys'];
  return {
    argumentDefinitions: [
      {
        kind: 'RootArgument',
        name: 'count',
      },
      {
        kind: 'RootArgument',
        name: 'cursor',
      },
    ],
    kind: 'Fragment',
    metadata: {
      connection: [
        {
          count: 'count',
          cursor: 'cursor',
          direction: 'forward',
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: 'count',
            cursor: 'cursor',
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: [],
        operation: ApiKeysListPaginationQuery_graphql,
      },
    },
    name: 'ApiKeysList',
    selections: [
      {
        alias: 'apiKeys',
        args: null,
        concreteType: 'ApiKeysConnection',
        kind: 'LinkedField',
        name: '__Query__apiKeys_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ApiKeysEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'ApiKey',
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
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'ApiKeysList_ApiKeyListItem',
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
    ],
    type: 'Query',
    abstractKey: null,
  };
})();

(node as any).hash = '086085b1a1b3f2523c2b76e4ffdc7b8a';

export default node;
