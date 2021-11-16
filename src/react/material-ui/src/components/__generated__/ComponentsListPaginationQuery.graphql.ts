/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ComponentsListPaginationQueryVariables = {
    count?: number | null | undefined;
    cursor?: string | null | undefined;
};
export type ComponentsListPaginationQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"Components_components">;
};
export type ComponentsListPaginationQuery = {
    readonly response: ComponentsListPaginationQueryResponse;
    readonly variables: ComponentsListPaginationQueryVariables;
};



/*
query ComponentsListPaginationQuery(
  $count: Int
  $cursor: String
) {
  ...Components_components
}

fragment Components_componentEdge on ComponentsEdge {
  node {
    id
    name
  }
}

fragment Components_components on Query {
  components(after: $cursor, first: $count) {
    edges {
      ...Components_componentEdge
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
    "name": "ComponentsListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Components_components"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComponentsListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ComponentsConnection",
        "kind": "LinkedField",
        "name": "components",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ComponentsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Component",
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
        "key": "QueryFragment_components",
        "kind": "LinkedHandle",
        "name": "components"
      }
    ]
  },
  "params": {
    "cacheID": "1e5d0a1851216345ef4f256939637c2d",
    "id": null,
    "metadata": {},
    "name": "ComponentsListPaginationQuery",
    "operationKind": "query",
    "text": "query ComponentsListPaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...Components_components\n}\n\nfragment Components_componentEdge on ComponentsEdge {\n  node {\n    id\n    name\n  }\n}\n\nfragment Components_components on Query {\n  components(after: $cursor, first: $count) {\n    edges {\n      ...Components_componentEdge\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ee096bf5150f1811f8ba1da727e4f86b';
export default node;
