/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CreateApplicationInput = {
    name: string;
    namespace?: string | null | undefined;
    parts?: Array<string> | null | undefined;
};
export type NewApplicationMutationVariables = {
    input: CreateApplicationInput;
    connectionIds: Array<string>;
};
export type NewApplicationMutationResponse = {
    readonly createApplication: {
        readonly application: {
            readonly id: string;
            readonly name: string;
            readonly namespace: string | null;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type NewApplicationMutation = {
    readonly response: NewApplicationMutationResponse;
    readonly variables: NewApplicationMutationVariables;
};



/*
mutation NewApplicationMutation(
  $input: CreateApplicationInput!
) {
  createApplication(input: $input) {
    application {
      id
      name
      namespace
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
  "concreteType": "Application",
  "kind": "LinkedField",
  "name": "application",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "namespace",
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
    "name": "NewApplicationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApplicationPayload",
        "kind": "LinkedField",
        "name": "createApplication",
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
    "name": "NewApplicationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateApplicationPayload",
        "kind": "LinkedField",
        "name": "createApplication",
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
            "name": "application",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "ApplicationsEdge"
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
    "cacheID": "2b6255db4a2210940bb2e5620821d1ce",
    "id": null,
    "metadata": {},
    "name": "NewApplicationMutation",
    "operationKind": "mutation",
    "text": "mutation NewApplicationMutation(\n  $input: CreateApplicationInput!\n) {\n  createApplication(input: $input) {\n    application {\n      id\n      name\n      namespace\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3e997e8d04a35698f6acf57073fd697d';
export default node;
