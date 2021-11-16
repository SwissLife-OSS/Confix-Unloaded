/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type RenameApplicationInput = {
    id: unknown;
    name: string;
};
export type EditApplicationRenameMutationVariables = {
    input: RenameApplicationInput;
};
export type EditApplicationRenameMutationResponse = {
    readonly renameApplication: {
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
export type EditApplicationRenameMutation = {
    readonly response: EditApplicationRenameMutationResponse;
    readonly variables: EditApplicationRenameMutationVariables;
};



/*
mutation EditApplicationRenameMutation(
  $input: RenameApplicationInput!
) {
  renameApplication(input: $input) {
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
v3 = {
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationRenameMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPayload",
        "kind": "LinkedField",
        "name": "renameApplication",
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
    "name": "EditApplicationRenameMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameApplicationPayload",
        "kind": "LinkedField",
        "name": "renameApplication",
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
    "cacheID": "92efb12231101abd9135deae4535175a",
    "id": null,
    "metadata": {},
    "name": "EditApplicationRenameMutation",
    "operationKind": "mutation",
    "text": "mutation EditApplicationRenameMutation(\n  $input: RenameApplicationInput!\n) {\n  renameApplication(input: $input) {\n    application {\n      id\n      name\n      namespace\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6ded6b6e261435831a92fe2640b0125c';
export default node;
