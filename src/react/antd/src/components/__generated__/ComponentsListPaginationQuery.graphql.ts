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
    readonly " $fragmentRefs": FragmentRefs<"ComponentsList_components">;
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
  ...ComponentsList_components
}

fragment ComponentsList_componentEdge on Component {
  id
  name
}

fragment ComponentsList_components on Query {
  components(after: $cursor, first: $count) {
    edges {
      node {
        ...ComponentsList_componentEdge
        id
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
        "name": "ComponentsList_components"
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "Query_components",
        "kind": "LinkedHandle",
        "name": "components"
      }
    ]
  },
  "params": {
    "cacheID": "272457b7c82f93abf9aca109407f7ea3",
    "id": null,
    "metadata": {},
    "name": "ComponentsListPaginationQuery",
    "operationKind": "query",
    "text": "query ComponentsListPaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...ComponentsList_components\n}\n\nfragment ComponentsList_componentEdge on Component {\n  id\n  name\n}\n\nfragment ComponentsList_components on Query {\n  components(after: $cursor, first: $count) {\n    edges {\n      node {\n        ...ComponentsList_componentEdge\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd19d5adb277a80308b5687e44afb844d';
export default node;
