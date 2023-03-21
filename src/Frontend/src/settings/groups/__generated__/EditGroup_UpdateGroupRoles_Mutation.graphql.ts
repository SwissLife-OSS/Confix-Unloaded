/**
 * @generated SignedSource<<b8c0667089a02558484a0df0cfe61128>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateGroupRolesInput = {
  id: string;
  roles: ReadonlyArray<RoleScopeInput>;
};
export type RoleScopeInput = {
  namespace: string;
  roleIds: ReadonlyArray<string>;
};
export type EditGroup_UpdateGroupRoles_Mutation$variables = {
  input: UpdateGroupRolesInput;
};
export type EditGroup_UpdateGroupRoles_Mutation$data = {
  readonly updateGroupRoles: {
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
    readonly group: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"EditGroup_RoleScopeSection">;
    } | null;
  };
};
export type EditGroup_UpdateGroupRoles_Mutation = {
  response: EditGroup_UpdateGroupRoles_Mutation$data;
  variables: EditGroup_UpdateGroupRoles_Mutation$variables;
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
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "UserError",
  "abstractKey": "__isUserError"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditGroup_UpdateGroupRoles_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateGroupRolesPayload",
        "kind": "LinkedField",
        "name": "updateGroupRoles",
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditGroup_RoleScopeSection"
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
    "name": "EditGroup_UpdateGroupRoles_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateGroupRolesPayload",
        "kind": "LinkedField",
        "name": "updateGroupRoles",
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
              (v2/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "RoleScope",
                "kind": "LinkedField",
                "name": "roles",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "namespace",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Role",
                    "kind": "LinkedField",
                    "name": "roles",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/)
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
    "cacheID": "cdafe066fdb43aaf4a2ec10ed45ddd9d",
    "id": null,
    "metadata": {},
    "name": "EditGroup_UpdateGroupRoles_Mutation",
    "operationKind": "mutation",
    "text": "mutation EditGroup_UpdateGroupRoles_Mutation(\n  $input: UpdateGroupRolesInput!\n) {\n  updateGroupRoles(input: $input) {\n    group {\n      id\n      ...EditGroup_RoleScopeSection\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        code\n        message\n      }\n    }\n  }\n}\n\nfragment EditGroup_RoleScopeSection on Group {\n  id\n  name\n  roles {\n    namespace\n    roles {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ceb1fa205662103fd6f8331a8d57ac51";

export default node;
