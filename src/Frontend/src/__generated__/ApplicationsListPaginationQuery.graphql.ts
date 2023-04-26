/**
 * @generated SignedSource<<bf334497760cb8fa269e983b28e28f04>>
 * @relayHash bc646b5c97522b9cf18c5dae35409786
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bc646b5c97522b9cf18c5dae35409786

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationsListPaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type ApplicationsListPaginationQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsList'>;
};
export type ApplicationsListPaginationQuery = {
  response: ApplicationsListPaginationQuery$data;
  variables: ApplicationsListPaginationQuery$variables;
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
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'namespace',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'ApplicationsListPaginationQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'ApplicationsList',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'ApplicationsListPaginationQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
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
                    v2 /*: any*/,
                    v3 /*: any*/,
                    v4 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ApplicationPart',
                      kind: 'LinkedField',
                      name: 'parts',
                      plural: true,
                      selections: [
                        v3 /*: any*/,
                        v2 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ApplicationPartComponent',
                          kind: 'LinkedField',
                          name: 'components',
                          plural: true,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Component',
                              kind: 'LinkedField',
                              name: 'definition',
                              plural: false,
                              selections: [v2 /*: any*/, v3 /*: any*/],
                              storageKey: null,
                            },
                            v2 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Application',
                          kind: 'LinkedField',
                          name: 'application',
                          plural: false,
                          selections: [v2 /*: any*/, v4 /*: any*/],
                          storageKey: null,
                        },
                      ],
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
          key: 'Query_applications',
          kind: 'LinkedHandle',
          name: 'applications',
        },
      ],
    },
    params: {
      id: 'bc646b5c97522b9cf18c5dae35409786',
      metadata: {},
      name: 'ApplicationsListPaginationQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = 'cc07d79282ec31ca496ef0dc31ad7cf9';

export default node;
