/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateEnvironmentInput = {
    name: string;
};
export type NewEnvironmentMutationVariables = {
    input: CreateEnvironmentInput;
    connectionIds: Array<string>;
};
export type NewEnvironmentMutationResponse = {
    readonly createEnvironment: {
        readonly environment: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type NewEnvironmentMutation = {
    readonly response: NewEnvironmentMutationResponse;
    readonly variables: NewEnvironmentMutationVariables;
};



/*
mutation NewEnvironmentMutation(
  $input: CreateEnvironmentInput!
) {
  createEnvironment(input: $input) {
    environment {
      id
      name
    }
    errors {
      __typename
      ... on IUserError {
        __isIUserError: __typename
        message
        code
      }
    }
  }
}
*/

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
      "name": "name",
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
  "type": "IUserError",
  "abstractKey": "__isIUserError"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewEnvironmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateEnvironmentPayload",
        "kind": "LinkedField",
        "name": "createEnvironment",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NewEnvironmentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateEnvironmentPayload",
        "kind": "LinkedField",
        "name": "createEnvironment",
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
            "name": "environment",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "EnvironmentsEdge"
              }
            ]
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
    "cacheID": "69dae0304ba357db69b07edd0ab66be1",
    "id": null,
    "metadata": {},
    "name": "NewEnvironmentMutation",
    "operationKind": "mutation",
    "text": "mutation NewEnvironmentMutation(\n  $input: CreateEnvironmentInput!\n) {\n  createEnvironment(input: $input) {\n    environment {\n      id\n      name\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '14b62399ce68bb6071e895b5419afe0a';
export default node;
