/**
 * @generated SignedSource<<9a6df3ca1756af049daa3898e8fbbf6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemoveRoleByIdInput = {
  id: string;
};
export type RemoveRoleDialogMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: RemoveRoleByIdInput;
};
export type RemoveRoleDialogMutation$data = {
  readonly removeRoleById: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly role: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"RolesList_RoleEdge">;
    } | null;
  };
};
export type RemoveRoleDialogMutation = {
  response: RemoveRoleDialogMutation$data;
  variables: RemoveRoleDialogMutation$variables;
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
    "name": "RemoveRoleDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveRoleByIdPayload",
        "kind": "LinkedField",
        "name": "removeRoleById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Role",
            "kind": "LinkedField",
            "name": "role",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RolesList_RoleEdge"
              }
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
    "name": "RemoveRoleDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveRoleByIdPayload",
        "kind": "LinkedField",
        "name": "removeRoleById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Role",
            "kind": "LinkedField",
            "name": "role",
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
              },
              (v3/*: any*/),
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "11ac965190e954f02ac75d699958e925",
    "id": null,
    "metadata": {},
    "name": "RemoveRoleDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveRoleDialogMutation(\n  $input: RemoveRoleByIdInput!\n) {\n  removeRoleById(input: $input) {\n    role {\n      id\n      ...RolesList_RoleEdge\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment RolesList_RoleEdge on Role {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "fbe7ac048c95a5d87a865f30f8fdf7aa";

export default node;
