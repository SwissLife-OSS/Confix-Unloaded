/**
 * @generated SignedSource<<b0ad96371a6183e8cc90c9e991393b1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE" | "%future added value";
export type ChangeRolePermissionsInput = {
  id: string;
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
export type EditRoleForm_ChangeRolePermissions_Mutation$variables = {
  input: ChangeRolePermissionsInput;
};
export type EditRoleForm_ChangeRolePermissions_Mutation$data = {
  readonly changeRolePermissions: {
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly role: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"EditRole_Form">;
    } | null;
  };
};
export type EditRoleForm_ChangeRolePermissions_Mutation = {
  response: EditRoleForm_ChangeRolePermissions_Mutation$data;
  variables: EditRoleForm_ChangeRolePermissions_Mutation$variables;
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditRoleForm_ChangeRolePermissions_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeRolePermissionsPayload",
        "kind": "LinkedField",
        "name": "changeRolePermissions",
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditRole_Form"
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
    "name": "EditRoleForm_ChangeRolePermissions_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeRolePermissionsPayload",
        "kind": "LinkedField",
        "name": "changeRolePermissions",
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
              (v2/*: any*/),
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
                "concreteType": "Permission",
                "kind": "LinkedField",
                "name": "permissions",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "scope",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PermissionsFlags",
                    "kind": "LinkedField",
                    "name": "permissions",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isRead",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isWrite",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isClaim",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPublish",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDecrypt",
                        "storageKey": null
                      }
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
    "cacheID": "97b99f2d810597f71e2d1eaf1565cf1f",
    "id": null,
    "metadata": {},
    "name": "EditRoleForm_ChangeRolePermissions_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditRoleForm_ChangeRolePermissions_Mutation(\n  $input: ChangeRolePermissionsInput!\n) {\n  changeRolePermissions(input: $input) {\n    role {\n      id\n      ...EditRole_Form\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n\nfragment EditRole_Form on Role {\n  id\n  name\n  permissions {\n    scope\n    permissions {\n      isRead\n      isWrite\n      isClaim\n      isPublish\n      isDecrypt\n    }\n  }\n  ...EditRole_Header\n}\n\nfragment EditRole_Header on Role {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "56594864461e5fcc7f090efce1f75679";

export default node;
