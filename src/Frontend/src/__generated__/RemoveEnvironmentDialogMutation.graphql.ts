/**
 * @generated SignedSource<<06cd9faebc6964e6a5f420a404b17a17>>
 * @relayHash 72f78a96391d14d0dedf756471fefcf3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 72f78a96391d14d0dedf756471fefcf3

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type RemoveEnvironmentByIdInput = {
  id: string;
};
export type RemoveEnvironmentDialogMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: RemoveEnvironmentByIdInput;
};
export type RemoveEnvironmentDialogMutation$data = {
  readonly removeEnvironmentById: {
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type RemoveEnvironmentDialogMutation = {
  response: RemoveEnvironmentDialogMutation$data;
  variables: RemoveEnvironmentDialogMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'connectionIds',
    },
    v1 = {
      defaultValue: null,
      kind: 'LocalArgument',
      name: 'input',
    },
    v2 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
    v5 = {
      alias: null,
      args: null,
      concreteType: null,
      kind: 'LinkedField',
      name: 'errors',
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: '__typename',
          storageKey: null,
        },
        {
          kind: 'InlineFragment',
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'message',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'code',
              storageKey: null,
            },
          ],
          type: 'UserError',
          abstractKey: '__isUserError',
        },
      ],
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'RemoveEnvironmentDialogMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'RemoveEnvironmentByIdPayload',
          kind: 'LinkedField',
          name: 'removeEnvironmentById',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Environment',
              kind: 'LinkedField',
              name: 'environment',
              plural: false,
              selections: [v3 /*: any*/, v4 /*: any*/],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: 'Operation',
      name: 'RemoveEnvironmentDialogMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'RemoveEnvironmentByIdPayload',
          kind: 'LinkedField',
          name: 'removeEnvironmentById',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Environment',
              kind: 'LinkedField',
              name: 'environment',
              plural: false,
              selections: [
                v3 /*: any*/,
                {
                  alias: null,
                  args: null,
                  filters: null,
                  handle: 'deleteEdge',
                  key: '',
                  kind: 'ScalarHandle',
                  name: 'id',
                  handleArgs: [
                    {
                      kind: 'Variable',
                      name: 'connections',
                      variableName: 'connectionIds',
                    },
                  ],
                },
                v4 /*: any*/,
              ],
              storageKey: null,
            },
            v5 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '72f78a96391d14d0dedf756471fefcf3',
      metadata: {},
      name: 'RemoveEnvironmentDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '7b3a31884d521db50585d9039df57e19';

export default node;
