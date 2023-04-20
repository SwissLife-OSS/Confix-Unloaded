/**
 * @generated SignedSource<<b1cb88aafaedf67c6dafc17d72bc8a21>>
 * @relayHash d17fabcfa72ad7a67dda358cbcf9f64e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c6cc01cb48ec12896ebd74c62f41b14c351cc5b4743e6777d6d8b920bfa7edfd

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveGroupByIdInput = {
  id: string;
};
export type RemoveGroupDialogMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: RemoveGroupByIdInput;
};
export type RemoveGroupDialogMutation$data = {
  readonly removeGroupById: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly group: {
      readonly id: string;
    } | null;
  };
};
export type RemoveGroupDialogMutation = {
  response: RemoveGroupDialogMutation$data;
  variables: RemoveGroupDialogMutation$variables;
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
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
      "type": "UserError",
      "abstractKey": "__isUserError"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveGroupDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveGroupByIdPayload",
        "kind": "LinkedField",
        "name": "removeGroupById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
    "name": "RemoveGroupDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveGroupByIdPayload",
        "kind": "LinkedField",
        "name": "removeGroupById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "group",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connectionIds"
                  }
                ]
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c6cc01cb48ec12896ebd74c62f41b14c351cc5b4743e6777d6d8b920bfa7edfd",
    "metadata": {},
    "name": "RemoveGroupDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0b94e613b990776f50ede4d31591841b";

export default node;
