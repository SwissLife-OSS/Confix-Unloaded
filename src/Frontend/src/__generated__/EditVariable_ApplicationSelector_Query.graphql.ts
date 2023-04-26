/**
 * @generated SignedSource<<e4f94ed216fef82057a8fb2616a34416>>
 * @relayHash 9d518894012b4c14cbd868a77ee1b4d8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9d518894012b4c14cbd868a77ee1b4d8

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditVariable_ApplicationSelector_Query$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type EditVariable_ApplicationSelector_Query$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'EditVariable_ApplicationSelector'>;
};
export type EditVariable_ApplicationSelector_Query = {
  response: EditVariable_ApplicationSelector_Query$data;
  variables: EditVariable_ApplicationSelector_Query$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: 20,
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
    v1 = {
      kind: 'Variable',
      name: 'search',
      variableName: 'search',
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
      v1 /*: any*/,
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
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditVariable_ApplicationSelector_Query',
      selections: [
        {
          args: [
            {
              kind: 'Variable',
              name: 'count',
              variableName: 'count',
            },
            {
              kind: 'Variable',
              name: 'cursor',
              variableName: 'cursor',
            },
            v1 /*: any*/,
          ],
          kind: 'FragmentSpread',
          name: 'EditVariable_ApplicationSelector',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditVariable_ApplicationSelector_Query',
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
                              selections: [v4 /*: any*/, v3 /*: any*/],
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
          filters: ['search'],
          handle: 'connection',
          key: 'Query_applications',
          kind: 'LinkedHandle',
          name: 'applications',
        },
      ],
    },
    params: {
      id: '9d518894012b4c14cbd868a77ee1b4d8',
      metadata: {},
      name: 'EditVariable_ApplicationSelector_Query',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = 'c40ba74cce71853634c9599a129ec957';

export default node;
