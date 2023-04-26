/**
 * @generated SignedSource<<ed9af2d7a9b0211bde8151b0745eaa04>>
 * @relayHash 7e9f8ff03c5b1c1111f3c11e8137c580
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7e9f8ff03c5b1c1111f3c11e8137c580

import {ConcreteRequest, Query} from 'relay-runtime';
export type CompareApplicationPartComponentVersions_Query$variables = {
  from: number;
  partComponentId: string;
  to: number;
};
export type CompareApplicationPartComponentVersions_Query$data = {
  readonly applicationPartComponentById: {
    readonly changeLog: ReadonlyArray<{
      readonly change: {
        readonly partComponentVersion?: number;
      };
    }>;
    readonly fromValues: string | null;
    readonly toValues: string | null;
    readonly version: number;
  } | null;
};
export type CompareApplicationPartComponentVersions_Query = {
  response: CompareApplicationPartComponentVersions_Query$data;
  variables: CompareApplicationPartComponentVersions_Query$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'from',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'partComponentId',
    },
    v2 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'to',
    },
    v3 = [
      {
        kind: 'Variable',
        name: 'partComponentId',
        variableName: 'partComponentId',
      },
    ],
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'version',
      storageKey: null,
    },
    v5 = {
      alias: 'fromValues',
      args: [
        {
          kind: 'Variable',
          name: 'version',
          variableName: 'from',
        },
      ],
      kind: 'ScalarField',
      name: 'values',
      storageKey: null,
    },
    v6 = {
      alias: 'toValues',
      args: [
        {
          kind: 'Variable',
          name: 'version',
          variableName: 'to',
        },
      ],
      kind: 'ScalarField',
      name: 'values',
      storageKey: null,
    },
    v7 = {
      kind: 'InlineFragment',
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'partComponentVersion',
          storageKey: null,
        },
      ],
      type: 'ApplicationPartComponentValuesChange',
      abstractKey: null,
    },
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/, v2 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'CompareApplicationPartComponentVersions_Query',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'ApplicationPartComponent',
          kind: 'LinkedField',
          name: 'applicationPartComponentById',
          plural: false,
          selections: [
            v4 /*: any*/,
            v5 /*: any*/,
            v6 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ChangeLog',
              kind: 'LinkedField',
              name: 'changeLog',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'change',
                  plural: false,
                  selections: [v7 /*: any*/],
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
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/, v2 /*: any*/],
      kind: 'Operation',
      name: 'CompareApplicationPartComponentVersions_Query',
      selections: [
        {
          alias: null,
          args: v3 /*: any*/,
          concreteType: 'ApplicationPartComponent',
          kind: 'LinkedField',
          name: 'applicationPartComponentById',
          plural: false,
          selections: [
            v4 /*: any*/,
            v5 /*: any*/,
            v6 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ChangeLog',
              kind: 'LinkedField',
              name: 'changeLog',
              plural: true,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: null,
                  kind: 'LinkedField',
                  name: 'change',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: '__typename',
                      storageKey: null,
                    },
                    v7 /*: any*/,
                  ],
                  storageKey: null,
                },
                v8 /*: any*/,
              ],
              storageKey: null,
            },
            v8 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '7e9f8ff03c5b1c1111f3c11e8137c580',
      metadata: {},
      name: 'CompareApplicationPartComponentVersions_Query',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = 'fd87212d73721a6f76bbf2ea70786b36';

export default node;
