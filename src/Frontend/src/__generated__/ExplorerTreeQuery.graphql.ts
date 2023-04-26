/**
 * @generated SignedSource<<3dfc860f9551856ff94e619db5496c69>>
 * @relayHash 1554187ead3cf72bd1664c40f807ed94
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1554187ead3cf72bd1664c40f807ed94

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ExplorerTreeQuery$variables = {
  count?: number | null;
  cursor?: string | null;
};
export type ExplorerTreeQuery$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'ExplorerTree_Applications'>;
};
export type ExplorerTreeQuery = {
  response: ExplorerTreeQuery$data;
  variables: ExplorerTreeQuery$variables;
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
    v2 = [
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
    ],
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v5 = [v3 /*: any*/, v4 /*: any*/],
    v6 = {
      alias: null,
      args: null,
      concreteType: 'VariableValue',
      kind: 'LinkedField',
      name: 'variableValues',
      plural: true,
      selections: [
        v3 /*: any*/,
        {
          alias: null,
          args: null,
          concreteType: 'Environment',
          kind: 'LinkedField',
          name: 'environment',
          plural: false,
          selections: v5 /*: any*/,
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: 'Variable',
          kind: 'LinkedField',
          name: 'variable',
          plural: false,
          selections: v5 /*: any*/,
          storageKey: null,
        },
      ],
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'ExplorerTreeQuery',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'ExplorerTree_Applications',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'ExplorerTreeQuery',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
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
                    v3 /*: any*/,
                    v4 /*: any*/,
                    {
                      if: null,
                      kind: 'Defer',
                      label:
                        'ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails',
                      selections: [
                        v6 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ApplicationPart',
                          kind: 'LinkedField',
                          name: 'parts',
                          plural: true,
                          selections: [
                            v3 /*: any*/,
                            v4 /*: any*/,
                            {
                              if: null,
                              kind: 'Defer',
                              label:
                                'ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart',
                              selections: [
                                v3 /*: any*/,
                                v4 /*: any*/,
                                v6 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'components',
                                  plural: true,
                                  selections: [
                                    v3 /*: any*/,
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'Component',
                                      kind: 'LinkedField',
                                      name: 'definition',
                                      plural: false,
                                      selections: v5 /*: any*/,
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                              ],
                            },
                          ],
                          storageKey: null,
                        },
                      ],
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
          args: v2 /*: any*/,
          filters: null,
          handle: 'connection',
          key: 'Query_applications',
          kind: 'LinkedHandle',
          name: 'applications',
        },
      ],
    },
    params: {
      id: '1554187ead3cf72bd1664c40f807ed94',
      metadata: {},
      name: 'ExplorerTreeQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '6c9cdae74916fd73591ecf5047d92e10';

export default node;
