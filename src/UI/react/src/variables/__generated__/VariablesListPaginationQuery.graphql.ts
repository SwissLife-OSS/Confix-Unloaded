/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type VariablesListPaginationQueryVariables = {
    count?: number | null | undefined;
    cursor?: string | null | undefined;
    search?: string | null | undefined;
};
export type VariablesListPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"VariablesList_Variables">;
};
export type VariablesListPaginationQuery = {
    readonly response: VariablesListPaginationQueryResponse;
    readonly variables: VariablesListPaginationQueryVariables;
};



/*
query VariablesListPaginationQuery(
  $count: Int
  $cursor: String
  $search: String
) {
  ...VariablesList_Variables
}

fragment VariablesList_VariableEdge on Variable {
  id
  name
}

fragment VariablesList_Variables on Query {
  searchVariables(after: $cursor, first: $count, search: $search) {
    edges {
      node {
        id
        name
        ...VariablesList_VariableEdge
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

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
    "name": "VariablesListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "VariablesList_Variables"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VariablesListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchVariablesConnection",
        "kind": "LinkedField",
        "name": "searchVariables",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchVariablesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Variable",
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
        "key": "Query_searchVariables",
        "kind": "LinkedHandle",
        "name": "searchVariables"
      }
    ]
  },
  "params": {
    "cacheID": "d82eca679132ef14b6df40b744218245",
    "id": null,
    "metadata": {},
    "name": "VariablesListPaginationQuery",
    "operationKind": "query",
    "text": "query VariablesListPaginationQuery(\n  $count: Int\n  $cursor: String\n  $search: String\n) {\n  ...VariablesList_Variables\n}\n\nfragment VariablesList_VariableEdge on Variable {\n  id\n  name\n}\n\nfragment VariablesList_Variables on Query {\n  searchVariables(after: $cursor, first: $count, search: $search) {\n    edges {\n      node {\n        id\n        name\n        ...VariablesList_VariableEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b2f8df3c3361e91c95ebef4f6d606cf6';
export default node;
