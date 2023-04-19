/**
 * @generated SignedSource<<5ab25ca5007089d2498ca089ce336ef4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateApiKeyInput = {
  name: string;
  roles: ReadonlyArray<RoleScopeInput>;
};
export type RoleScopeInput = {
  namespace: string;
  roleIds: ReadonlyArray<string>;
};
export type NewApiKeyMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateApiKeyInput;
};
export type NewApiKeyMutation$data = {
  readonly createApiKey: {
    readonly apiKeyWithSecret: {
      readonly key: {
        readonly id: string;
      };
      readonly secret: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type NewApiKeyMutation = {
  response: NewApiKeyMutation$data;
  variables: NewApiKeyMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connectionIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ApiKey",
  "kind": "LinkedField",
  "name": "key",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "secret",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    }
  ],
  "type": "UserError",
  "abstractKey": "__isUserError"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewApiKeyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApiKeyPayload",
        "kind": "LinkedField",
        "name": "createApiKey",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKeyWithSecret",
            "kind": "LinkedField",
            "name": "apiKeyWithSecret",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
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
              (v5/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NewApiKeyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApiKeyPayload",
        "kind": "LinkedField",
        "name": "createApiKey",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKeyWithSecret",
            "kind": "LinkedField",
            "name": "apiKeyWithSecret",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendNode",
                "key": "",
                "kind": "LinkedHandle",
                "name": "key",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connectionIds"
                  },
                  {
                    "kind": "Literal",
                    "name": "edgeTypeName",
                    "value": "ApiKeysEdge"
                  }
                ]
              },
              (v4/*: any*/)
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
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c23debe1d309a5a7164e0b8ac2545b02",
    "id": null,
    "metadata": {},
    "name": "NewApiKeyMutation",
    "operationKind": "mutation",
    "text": "mutation NewApiKeyMutation(\n  $input: CreateApiKeyInput!\n) {\n  createApiKey(input: $input) {\n    apiKeyWithSecret {\n      key {\n        id\n      }\n      secret\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d2995436bed130f6243cd852d402e8a2";

export default node;
