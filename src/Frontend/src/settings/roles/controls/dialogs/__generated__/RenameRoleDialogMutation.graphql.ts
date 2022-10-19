/**
 * @generated SignedSource<<faaf9fee603f7ef1562ee8cc137af31e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RenameRoleInput = {
  id: string;
  name: string;
};
export type RenameRoleDialogMutation$variables = {
  input: RenameRoleInput;
};
export type RenameRoleDialogMutation$data = {
  readonly renameRole: {
    readonly role: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"RolesList_RoleEdge">;
    } | null;
  };
};
export type RenameRoleDialogMutation = {
  response: RenameRoleDialogMutation$data;
  variables: RenameRoleDialogMutation$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RenameRoleDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameRolePayload",
        "kind": "LinkedField",
        "name": "renameRole",
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
                "name": "RolesList_RoleEdge"
              }
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
    "name": "RenameRoleDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameRolePayload",
        "kind": "LinkedField",
        "name": "renameRole",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d29cdabf20c3696b410578b0d6c474c5",
    "id": null,
    "metadata": {},
    "name": "RenameRoleDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameRoleDialogMutation(\n  $input: RenameRoleInput!\n) {\n  renameRole(input: $input) {\n    role {\n      id\n      ...RolesList_RoleEdge\n    }\n  }\n}\n\nfragment RolesList_RoleEdge on Role {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "52ef21c7046034fc06f654f3307db251";

export default node;
