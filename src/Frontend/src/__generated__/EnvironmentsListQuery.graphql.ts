/**
 * @generated SignedSource<<e14c7905617561e86e23c4fe5ba07b76>>
 * @relayHash 655e0796df71fab024d07d413f942e20
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 655e0796df71fab024d07d413f942e20

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EnvironmentsListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type EnvironmentsListQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'EnvironmentsList'>;
};
export type EnvironmentsListQuery = {
  response: EnvironmentsListQuery$data;
  variables: EnvironmentsListQuery$variables;
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
      name: 'EnvironmentsListQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'EnvironmentsList',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'EnvironmentsListQuery',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'SearchEnvironmentsConnection',
          kind: 'LinkedField',
          name: 'searchEnvironments',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'SearchEnvironmentsEdge',
              kind: 'LinkedField',
              name: 'edges',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'Environment',
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
          key: 'Query_searchEnvironments',
          kind: 'LinkedHandle',
          name: 'searchEnvironments',
        },
      ],
    },
    params: {
      id: '655e0796df71fab024d07d413f942e20',
      metadata: {},
      name: 'EnvironmentsListQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '8904f21c363d95d942ba5923c9b93560';

export default node;
