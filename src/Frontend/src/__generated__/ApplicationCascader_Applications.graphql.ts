/**
 * @generated SignedSource<<0054fdd4450168600b3cc75e797f2b1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {ReaderFragment, RefetchableFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationCascader_Applications$data = {
  readonly applications: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly namespace: string;
        readonly parts: ReadonlyArray<{
          readonly id: string;
          readonly name: string;
        }>;
      };
    }> | null;
  } | null;
  readonly ' $fragmentType': 'ApplicationCascader_Applications';
};
export type ApplicationCascader_Applications$key = {
  readonly ' $data'?: ApplicationCascader_Applications$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationCascader_Applications'>;
};

import ApplicationCascader_ApplicationPagination_Query_graphql from './ApplicationCascader_ApplicationPagination_Query.graphql';

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
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'search',
      },
    ],
    kind: 'Fragment',
    metadata: {
      refetch: {
        connection: null,
        fragmentPathInResult: [],
        operation: ApplicationCascader_ApplicationPagination_Query_graphql,
      },
    },
    name: 'ApplicationCascader_Applications',
    selections: [
      {
        alias: null,
        args: [
          {
            kind: 'Literal',
            name: 'first',
            value: 50,
          },
          {
            kind: 'Variable',
            name: 'search',
            variableName: 'search',
          },
        ],
        concreteType: 'ApplicationsConnection',
        kind: 'LinkedField',
        name: 'applications',
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
                    name: 'namespace',
                    storageKey: null,
                  },
                  v0 /*: any*/,
                  v1 /*: any*/,
                  {
                    alias: null,
                    args: null,
                    concreteType: 'ApplicationPart',
                    kind: 'LinkedField',
                    name: 'parts',
                    plural: true,
                    selections: [v0 /*: any*/, v1 /*: any*/],
                    storageKey: null,
                  },
                ],
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

(node as any).hash = '55aba6a2ef3d2c59395799aab66a73a3';

export default node;
