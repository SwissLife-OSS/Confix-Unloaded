/**
 * @generated SignedSource<<c93b8a879bba371bba481ae220d3aaa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ReaderFragment, RefetchableFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ExplorerTree_Applications$data = {
  readonly applications: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<'ExplorerTree_Application'>;
      };
    }> | null;
  } | null;
  readonly ' $fragmentType': 'ExplorerTree_Applications';
};
export type ExplorerTree_Applications$key = {
  readonly ' $data'?: ExplorerTree_Applications$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ExplorerTree_Applications'>;
};

import ExplorerTreePaginationQuery_graphql from './ExplorerTreePaginationQuery.graphql';

const node: ReaderFragment = (function () {
  var v0 = ['applications'];
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
        operation: ExplorerTreePaginationQuery_graphql,
      },
    },
    name: 'ExplorerTree_Applications',
    selections: [
      {
        alias: 'applications',
        args: null,
        concreteType: 'ApplicationsConnection',
        kind: 'LinkedField',
        name: '__Query_applications_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ApplicationsEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'Application',
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
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'ExplorerTree_Application',
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

(node as any).hash = 'ab0102538098b31dd4eccbae01646549';

export default node;
