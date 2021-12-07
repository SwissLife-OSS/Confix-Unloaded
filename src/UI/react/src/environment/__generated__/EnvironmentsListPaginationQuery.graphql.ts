/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EnvironmentsListPaginationQueryVariables = {
    count?: number | null | undefined;
    cursor?: string | null | undefined;
    search?: string | null | undefined;
};
export type EnvironmentsListPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"EnvironmentsList_Environments">;
};
export type EnvironmentsListPaginationQuery = {
    readonly response: EnvironmentsListPaginationQueryResponse;
    readonly variables: EnvironmentsListPaginationQueryVariables;
};



/*
query EnvironmentsListPaginationQuery(
  $count: Int
  $cursor: String
  $search: String
) {
  ...EnvironmentsList_Environments
}

fragment EnvironmentsList_EnvironmentEdge on Environment {
  id
  name
}

fragment EnvironmentsList_Environments on Query {
  searchEnvironments(after: $cursor, first: $count, search: $search) {
    edges {
      node {
        id
        name
        ...EnvironmentsList_EnvironmentEdge
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
    "name": "EnvironmentsListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EnvironmentsList_Environments"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnvironmentsListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SearchEnvironmentsConnection",
        "kind": "LinkedField",
        "name": "searchEnvironments",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchEnvironmentsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Environment",
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
        "key": "Query_searchEnvironments",
        "kind": "LinkedHandle",
        "name": "searchEnvironments"
      }
    ]
  },
  "params": {
    "cacheID": "4e370ad2f3c15021baa6679f14535d03",
    "id": null,
    "metadata": {},
    "name": "EnvironmentsListPaginationQuery",
    "operationKind": "query",
    "text": "query EnvironmentsListPaginationQuery(\n  $count: Int\n  $cursor: String\n  $search: String\n) {\n  ...EnvironmentsList_Environments\n}\n\nfragment EnvironmentsList_EnvironmentEdge on Environment {\n  id\n  name\n}\n\nfragment EnvironmentsList_Environments on Query {\n  searchEnvironments(after: $cursor, first: $count, search: $search) {\n    edges {\n      node {\n        id\n        name\n        ...EnvironmentsList_EnvironmentEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5b3eae102322d04bd73afa1dd1d11813';
export default node;
