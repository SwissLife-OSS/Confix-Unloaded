/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ApplicationsListPaginationQueryVariables = {
    count?: number | null | undefined;
    cursor?: string | null | undefined;
};
export type ApplicationsListPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Applications_applications">;
};
export type ApplicationsListPaginationQuery = {
    readonly response: ApplicationsListPaginationQueryResponse;
    readonly variables: ApplicationsListPaginationQueryVariables;
};



/*
query ApplicationsListPaginationQuery(
  $count: Int
  $cursor: String
) {
  ...Applications_applications
}

fragment Applications_applicationEdge on ApplicationsEdge {
  node {
    id
    name
    namespace
  }
}

fragment Applications_applications on Query {
  applications(after: $cursor, first: $count) {
    edges {
      ...Applications_applicationEdge
      cursor
      node {
        __typename
        id
      }
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplicationsListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Applications_applications"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplicationsListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ApplicationsConnection",
        "kind": "LinkedField",
        "name": "applications",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
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
                    "name": "namespace",
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
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "QueryFragment_applications",
        "kind": "LinkedHandle",
        "name": "applications"
      }
    ]
  },
  "params": {
    "cacheID": "b07f7d46215f6c68a958de2cc6175327",
    "id": null,
    "metadata": {},
    "name": "ApplicationsListPaginationQuery",
    "operationKind": "query",
    "text": "query ApplicationsListPaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...Applications_applications\n}\n\nfragment Applications_applicationEdge on ApplicationsEdge {\n  node {\n    id\n    name\n    namespace\n  }\n}\n\nfragment Applications_applications on Query {\n  applications(after: $cursor, first: $count) {\n    edges {\n      ...Applications_applicationEdge\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f73fb0a366447f887ee31d35be00f5de';
export default node;
