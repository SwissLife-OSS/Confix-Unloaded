/**
 * @generated SignedSource<<4ec8034b685c33334932bbdd2a501cfa>>
 * @relayHash 8bac2ea914ba0a1cd027bc9a7852e6ce
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8bac2ea914ba0a1cd027bc9a7852e6ce

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type CreateEnvironmentInput = {
  name: string;
};
export type NewEnvironmentMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateEnvironmentInput;
};
export type NewEnvironmentMutation$data = {
  readonly createEnvironment: {
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type NewEnvironmentMutation = {
  response: NewEnvironmentMutation$data;
  variables: NewEnvironmentMutation$variables;
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
      concreteType: 'Environment',
      kind: 'LinkedField',
      name: 'environment',
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
      ],
      storageKey: null,
    },
    v4 = {
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
    };
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: 'Fragment',
      metadata: null,
      name: 'NewEnvironmentMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'CreateEnvironmentPayload',
          kind: 'LinkedField',
          name: 'createEnvironment',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'errors',
              plural: true,
              selections: [v4 /*: any*/],
              storageKey: null,
            },
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
      name: 'NewEnvironmentMutation',
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: 'CreateEnvironmentPayload',
          kind: 'LinkedField',
          name: 'createEnvironment',
          plural: false,
          selections: [
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              filters: null,
              handle: 'appendNode',
              key: '',
              kind: 'LinkedHandle',
              name: 'environment',
              handleArgs: [
                {
                  kind: 'Variable',
                  name: 'connections',
                  variableName: 'connectionIds',
                },
                {
                  kind: 'Literal',
                  name: 'edgeTypeName',
                  value: 'EnvironmentsEdge',
                },
              ],
            },
            {
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
                v4 /*: any*/,
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '8bac2ea914ba0a1cd027bc9a7852e6ce',
      metadata: {},
      name: 'NewEnvironmentMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '3d352b3f8adba4c4fcdd4ba05030aae4';

export default node;
