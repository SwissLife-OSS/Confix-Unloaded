/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type PublishApplicationPartByIdInput = {
    applicationPartId: string;
};
export type PublishApplicationPartDialogMutationVariables = {
    input: PublishApplicationPartByIdInput;
};
export type PublishApplicationPartDialogMutationResponse = {
    readonly publishApplicationPartById: {
        readonly publishedApplicationPart: {
            readonly id: string;
            readonly version: number;
        } | null;
        readonly errors: ReadonlyArray<{
            readonly __typename: string;
            readonly message?: string | undefined;
            readonly code?: string | undefined;
        }> | null;
    };
};
export type PublishApplicationPartDialogMutation = {
    readonly response: PublishApplicationPartDialogMutationResponse;
    readonly variables: PublishApplicationPartDialogMutationVariables;
};



/*
mutation PublishApplicationPartDialogMutation(
  $input: PublishApplicationPartByIdInput!
) {
  publishApplicationPartById(input: $input) {
    publishedApplicationPart {
      id
      version
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "PublishApplicationPartByIdPayload",
    "kind": "LinkedField",
    "name": "publishApplicationPartById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PublishedApplicationPart",
        "kind": "LinkedField",
        "name": "publishedApplicationPart",
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
            "name": "version",
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
          {
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
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PublishApplicationPartDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PublishApplicationPartDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c8fd9eb74a6ed015fa0e4f4f54036faf",
    "id": null,
    "metadata": {},
    "name": "PublishApplicationPartDialogMutation",
    "operationKind": "mutation",
    "text": "mutation PublishApplicationPartDialogMutation(\n  $input: PublishApplicationPartByIdInput!\n) {\n  publishApplicationPartById(input: $input) {\n    publishedApplicationPart {\n      id\n      version\n    }\n    errors {\n      __typename\n      ... on IUserError {\n        __isIUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '31e92c4467c3775a88e41dece18c522e';
export default node;
