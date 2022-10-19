/**
 * @generated SignedSource<<6f54ced2aea48e80d9c39ce1676cefd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RolesListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type RolesListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RolesList_Roles">;
};
export type RolesListQuery = {
  response: RolesListQuery$data;
  variables: RolesListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v3 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Variable",
    "name": "search",
    "variableName": "search"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RolesListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RolesList_Roles"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "RolesListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
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
        "args": (v3/*: any*/),
        "filters": [
          "search"
        ],
        "handle": "connection",
        "key": "Query_searchRoles",
        "kind": "LinkedHandle",
        "name": "searchRoles"
      }
    ]
  },
  "params": {
    "cacheID": "759bf3d9f66f43a46d3da4980660d2c4",
    "id": null,
    "metadata": {},
    "name": "RolesListQuery",
    "operationKind": "query",
    "text": "query RolesListQuery(\n  $cursor: String\n  $count: Int\n  $search: String\n) {\n  ...RolesList_Roles\n}\n\nfragment RolesList_RoleEdge on Role {\n  id\n  name\n}\n\nfragment RolesList_Roles on Query {\n  searchRoles(after: $cursor, first: $count, search: $search) {\n    edges {\n      node {\n        id\n        name\n        ...RolesList_RoleEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4073948de246ebf155152d94c4bffff5";

export default node;
