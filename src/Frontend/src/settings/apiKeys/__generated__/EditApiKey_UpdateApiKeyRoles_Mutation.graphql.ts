/**
 * @generated SignedSource<<125edff1828f088c0307cc128aacdf03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"EditApiKey_ApiKey">;
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
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
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditApiKey_ApiKey"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
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
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "620561c8a2c6ca372f77a43a5fa1979c",
    "id": null,
    "metadata": {},
    "name": "EditApiKey_UpdateApiKeyRoles_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditApiKey_UpdateApiKeyRoles_Mutation(\n  $input: UpdateApiKeyInput!\n) {\n  updateApiKey(input: $input) {\n    apiKey {\n      id\n      ...EditApiKey_ApiKey\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        code\n        message\n      }\n    }\n  }\n}\n\nfragment EditApiKey_ApiKey on ApiKey {\n  id\n  name\n  roles {\n    namespace\n    roles {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3acc2a8d3eac698d2103d645e361755c";

export default node;
