/**
 * @generated SignedSource<<e18154efe1a97860f06bb17f29e2365d>>
 * @relayHash a2909a3b0de86280971ed27bea2e232f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a2909a3b0de86280971ed27bea2e232f

import {ConcreteRequest, Mutation} from 'relay-runtime';
export type UpdateApiKeyInput = {
  id: string;
  roles: ReadonlyArray<RoleScopeInput>;
};
export type RoleScopeInput = {
  namespace: string;
  roleIds: ReadonlyArray<string>;
};
export type EditApiKey_UpdateApiKeyRoles_Mutation$variables = {
  input: UpdateApiKeyInput;
};
export type EditApiKey_UpdateApiKeyRoles_Mutation$data = {
  readonly updateApiKey: {
    readonly apiKey: {
      readonly id: string;
      readonly roles: ReadonlyArray<{
        readonly namespace: string;
        readonly roles: ReadonlyArray<{
          readonly id: string;
          readonly name: string;
        }>;
      }>;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type EditApiKey_UpdateApiKeyRoles_Mutation = {
  response: EditApiKey_UpdateApiKeyRoles_Mutation$data;
  variables: EditApiKey_UpdateApiKeyRoles_Mutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
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
      concreteType: 'ApiKey',
      kind: 'LinkedField',
      name: 'apiKey',
      plural: false,
      selections: [
        v2 /*: any*/,
        {
          alias: null,
          args: null,
          concreteType: 'RoleScope',
          kind: 'LinkedField',
          name: 'roles',
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'namespace',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              concreteType: 'Role',
              kind: 'LinkedField',
              name: 'roles',
              plural: true,
              selections: [
                v2 /*: any*/,
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
          ],
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
          name: 'code',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'message',
          storageKey: null,
        },
      ],
      type: 'UserError',
      abstractKey: '__isUserError',
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditApiKey_UpdateApiKeyRoles_Mutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'UpdateApiKeyPayload',
          kind: 'LinkedField',
          name: 'updateApiKey',
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
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditApiKey_UpdateApiKeyRoles_Mutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'UpdateApiKeyPayload',
          kind: 'LinkedField',
          name: 'updateApiKey',
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
      id: 'a2909a3b0de86280971ed27bea2e232f',
      metadata: {},
      name: 'EditApiKey_UpdateApiKeyRoles_Mutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '703d5aa320ba06a0ac9aa5b665b3eb98';

export default node;
