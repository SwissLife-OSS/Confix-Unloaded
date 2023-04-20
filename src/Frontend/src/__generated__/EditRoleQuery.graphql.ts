/**
 * @generated SignedSource<<5ebaa13bfcbcb03308341f5c73e26fd4>>
 * @relayHash cdb9e0778d21d5ba533b3196d5f5f17c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 322ec3d8268f692cc3fa24e85a8337a7f5fe3debc2cdd0215e9ac755215a9d95

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditRoleQuery$variables = {
  id: string;
};
export type EditRoleQuery$data = {
  readonly roleById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditRole_Form">;
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
            "name": "EditRole_Form"
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
    "id": "322ec3d8268f692cc3fa24e85a8337a7f5fe3debc2cdd0215e9ac755215a9d95",
    "metadata": {},
    "name": "EditRoleQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1796c7cad5cc53074553f1349d27c886";

export default node;
