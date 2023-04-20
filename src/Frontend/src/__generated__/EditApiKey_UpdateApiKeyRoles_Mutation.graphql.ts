/**
 * @generated SignedSource<<fefd5cea7b95f5d8dfd47ff4eb12a50e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
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

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ApiKey",
  "kind": "LinkedField",
  "name": "apiKey",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "RoleScope",
      "kind": "LinkedField",
      "name": "roles",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespace",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Role",
          "kind": "LinkedField",
          "name": "roles",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "UserError",
  "abstractKey": "__isUserError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApiKey_UpdateApiKeyRoles_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApiKeyPayload",
        "kind": "LinkedField",
        "name": "updateApiKey",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditApiKey_UpdateApiKeyRoles_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApiKeyPayload",
        "kind": "LinkedField",
        "name": "updateApiKey",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a2909a3b0de86280971ed27bea2e232f",
    "id": null,
    "metadata": {},
    "name": "EditApiKey_UpdateApiKeyRoles_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditApiKey_UpdateApiKeyRoles_Mutation(\n  $input: UpdateApiKeyInput!\n) {\n  updateApiKey(input: $input) {\n    apiKey {\n      id\n      roles {\n        namespace\n        roles {\n          id\n          name\n        }\n      }\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        code\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "703d5aa320ba06a0ac9aa5b665b3eb98";

export default node;
