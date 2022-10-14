/**
 * @generated SignedSource<<87df48e8eae982a0f665fb5f37156502>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExplorerTreePaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
};
export type ExplorerTreePaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExplorerTree_Applications">;
};
export type ExplorerTreePaginationQuery = {
  response: ExplorerTreePaginationQuery$data;
  variables: ExplorerTreePaginationQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableValue",
  "kind": "LinkedField",
  "name": "variableValues",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environment",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExplorerTreePaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ExplorerTree_Applications"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExplorerTreePaginationQuery",
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "if": null,
                    "kind": "Defer",
                    "label": "ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails",
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "parts",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "if": null,
                            "kind": "Defer",
                            "label": "ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ApplicationPartComponent",
                                "kind": "LinkedField",
                                "name": "components",
                                "plural": true,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Component",
                                    "kind": "LinkedField",
                                    "name": "definition",
                                    "plural": false,
                                    "selections": (v4/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ]
                          }
                        ],
                        "storageKey": null
                      }
                    ]
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
        "key": "Query_applications",
        "kind": "LinkedHandle",
        "name": "applications"
      }
    ]
  },
  "params": {
    "cacheID": "d685d1a828a9cc733475c75ff0540cf7",
    "id": null,
    "metadata": {},
    "name": "ExplorerTreePaginationQuery",
    "operationKind": "query",
    "text": "query ExplorerTreePaginationQuery(\n  $count: Int\n  $cursor: String\n) {\n  ...ExplorerTree_Applications\n}\n\nfragment ExplorerTree_Application on Application {\n  id\n  name\n  ...ExplorerTree_ApplicationDetails @defer(label: \"ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails\")\n}\n\nfragment ExplorerTree_ApplicationDetails on Application {\n  variableValues {\n    id\n    environment {\n      id\n      name\n    }\n    variable {\n      id\n      name\n    }\n  }\n  parts {\n    id\n    name\n    ...ExplorerTree_ApplicationPart @defer(label: \"ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart\")\n  }\n}\n\nfragment ExplorerTree_ApplicationPart on ApplicationPart {\n  id\n  name\n  variableValues {\n    id\n    environment {\n      id\n      name\n    }\n    variable {\n      id\n      name\n    }\n  }\n  components {\n    id\n    definition {\n      id\n      name\n    }\n  }\n}\n\nfragment ExplorerTree_Applications on Query {\n  applications(after: $cursor, first: $count) {\n    edges {\n      node {\n        id\n        ...ExplorerTree_Application\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab0102538098b31dd4eccbae01646549";

export default node;
