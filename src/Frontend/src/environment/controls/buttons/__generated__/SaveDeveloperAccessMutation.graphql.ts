/**
 * @generated SignedSource<<97fb4fb8fd140f87968ba9ab08652fb3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetDeveloperAccessOfEnvironmentInput = {
  environmentId: string;
  isAllowed: boolean;
};
export type SaveDeveloperAccessMutation$variables = {
  input: SetDeveloperAccessOfEnvironmentInput;
};
export type SaveDeveloperAccessMutation$data = {
  readonly setDeveloperAccessOfEnvironment: {
    readonly environment: {
      readonly allowDeveloperAccess: boolean;
      readonly id: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly environmentId?: string;
      readonly message?: string;
    }> | null;
  };
};
export type SaveDeveloperAccessMutation = {
  response: SaveDeveloperAccessMutation$data;
  variables: SaveDeveloperAccessMutation$variables;
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
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "allowDeveloperAccess",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "environmentId",
      "storageKey": null
    },
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "EnvironmentNotFoundError",
  "abstractKey": null
},
v6 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "UnauthorizedOperationError",
  "abstractKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "UserError",
  "abstractKey": "__isUserError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SaveDeveloperAccessMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDeveloperAccessOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setDeveloperAccessOfEnvironment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
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
    "name": "SaveDeveloperAccessMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDeveloperAccessOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setDeveloperAccessOfEnvironment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v5/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e950a9838e09607549ed817dd56a793",
    "id": null,
    "metadata": {},
    "name": "SaveDeveloperAccessMutation",
    "operationKind": "mutation",
    "text": "mutation SaveDeveloperAccessMutation(\n  $input: SetDeveloperAccessOfEnvironmentInput!\n) {\n  setDeveloperAccessOfEnvironment(input: $input) {\n    environment {\n      id\n      allowDeveloperAccess\n    }\n    errors {\n      __typename\n      ... on EnvironmentNotFoundError {\n        environmentId\n        code\n        message\n      }\n      ... on UnauthorizedOperationError {\n        code\n        message\n      }\n      ... on UserError {\n        __isUserError: __typename\n        code\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd737842b378e2bffde298055f8d5002";

export default node;
