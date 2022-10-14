/**
 * @generated SignedSource<<910735115bffe0fca8178f0a5fe8a00e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditRoleQuery$variables = {
  id: string;
};
export type EditRoleQuery$data = {
  readonly roleById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditRole_Role">;
  } | null;
};
export type EditRoleQuery = {
  response: EditRoleQuery$data;
  variables: EditRoleQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "name": "EditRoleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Role",
        "kind": "LinkedField",
        "name": "roleById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditRole_Role"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditRoleQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Role",
        "kind": "LinkedField",
        "name": "roleById",
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
      }
    ]
  },
  "params": {
    "cacheID": "75fa89b2591bcc64878253c06bc6798d",
    "id": null,
    "metadata": {},
    "name": "EditRoleQuery",
    "operationKind": "query",
    "text": "query EditRoleQuery(\n  $id: ID!\n) {\n  roleById(id: $id) {\n    id\n    ...EditRole_Role\n  }\n}\n\nfragment EditRole_Role on Role {\n  id\n  name\n  permissions {\n    scope\n    permissions {\n      isRead\n      isWrite\n      isClaim\n      isPublish\n      isDecrypt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "67ccb511ff7da406ad56b66b36e4c5b5";

export default node;
