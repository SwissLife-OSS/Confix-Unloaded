/**
 * @generated SignedSource<<fb39143afd2b362ad24cf5229f692329>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RolesListPaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type RolesListPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RolesList_Roles">;
};
export type RolesListPaginationQuery = {
  response: RolesListPaginationQuery$data;
  variables: RolesListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RolesListPaginationQuery",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RolesListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
        "args": (v1/*: any*/),
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
    "cacheID": "fa9a2f355e41eadaef4aa6df6f7b1a50",
    "id": null,
    "metadata": {},
    "name": "RolesListPaginationQuery",
    "operationKind": "query",
    "text": "query RolesListPaginationQuery(\n  $count: Int\n  $cursor: String\n  $search: String\n) {\n  ...RolesList_Roles\n}\n\nfragment RolesList_RoleEdge on Role {\n  id\n  name\n}\n\nfragment RolesList_Roles on Query {\n  searchRoles(after: $cursor, first: $count, search: $search) {\n    edges {\n      node {\n        id\n        name\n        ...RolesList_RoleEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6603fc8ff324e1854d1254ea76e4a29d";

export default node;
