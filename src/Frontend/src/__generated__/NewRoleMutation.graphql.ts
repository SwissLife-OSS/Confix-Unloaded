/**
 * @generated SignedSource<<f8f68e59fe0781e90834429e8dc39b6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE" | "%future added value";
export type CreateRoleInput = {
  name: string;
  permissions: ReadonlyArray<PermissionInput>;
};
export type PermissionInput = {
  permissions: PermissionsFlagsInput;
  scope: Scope;
};
export type PermissionsFlagsInput = {
  isClaim?: boolean | null;
  isDecrypt?: boolean | null;
  isPublish?: boolean | null;
  isRead?: boolean | null;
  isWrite?: boolean | null;
};
export type NewRoleMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateRoleInput;
};
export type NewRoleMutation$data = {
  readonly createRole: {
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly role: {
      readonly id: string;
      readonly name: string;
      readonly " $fragmentSpreads": FragmentRefs<"RolesList_RoleListItem">;
    } | null;
  };
};
export type NewRoleMutation = {
  response: NewRoleMutation$data;
  variables: NewRoleMutation$variables;
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
  "kind": "ScalarField",
  "name": "name",
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
    "name": "NewRoleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateRolePayload",
        "kind": "LinkedField",
        "name": "createRole",
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
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RolesList_RoleListItem"
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
    "name": "NewRoleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateRolePayload",
        "kind": "LinkedField",
        "name": "createRole",
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
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "role",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "RolesEdge"
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
    "cacheID": "cb1415fbf322a1537f30a1334c2deecf",
    "id": null,
    "metadata": {},
    "name": "NewRoleMutation",
    "operationKind": "mutation",
    "text": "mutation NewRoleMutation(\n  $input: CreateRoleInput!\n) {\n  createRole(input: $input) {\n    role {\n      id\n      name\n      ...RolesList_RoleListItem\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment RolesList_RoleListItem on Role {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "47f20dfe81945f6fe843678f57491c36";

export default node;
