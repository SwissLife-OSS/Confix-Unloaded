/**
 * @generated SignedSource<<4749fa350625189bf8354315166d4cba>>
 * @relayHash 4fe0458844e03fd131f11450283384c5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e9506ae252b23dc7940e985de348f09cf6ca60d8e43122f804343d78af500265

import { ConcreteRequest, Query } from 'relay-runtime';
export type RolesSelectQuery$variables = {
  search: string;
};
export type RolesSelectQuery$data = {
  readonly searchRoles: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }> | null;
  } | null;
};
export type RolesSelectQuery = {
  response: RolesSelectQuery$data;
  variables: RolesSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
    "concreteType": "SearchRolesConnection",
    "kind": "LinkedField",
    "name": "searchRoles",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SearchRolesEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Role",
            "kind": "LinkedField",
            "name": "node",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RolesSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RolesSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "e9506ae252b23dc7940e985de348f09cf6ca60d8e43122f804343d78af500265",
    "metadata": {},
    "name": "RolesSelectQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "366e5723fa6c805b28f1efa015712bfb";

export default node;
