/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExplorerTreeQueryVariables = {
    cursor?: string | null | undefined;
    count?: number | null | undefined;
};
export type ExplorerTreeQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"ExplorerTree_Applications">;
};
export type ExplorerTreeQuery = {
    readonly response: ExplorerTreeQueryResponse;
    readonly variables: ExplorerTreeQueryVariables;
};



/*
query ExplorerTreeQuery(
  $cursor: String
  $count: Int
) {
  ...ExplorerTree_Applications
}

fragment ExplorerTree_Application on Application {
  id
  name
  ...ExplorerTree_ApplicationDetails @defer(label: "ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails")
}

fragment ExplorerTree_ApplicationDetails on Application {
  variableValues {
    id
    environment {
      id
      name
    }
    variable {
      id
      name
    }
  }
  parts {
    id
    name
    ...ExplorerTree_ApplicationPart @defer(label: "ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart")
  }
}

fragment ExplorerTree_ApplicationPart on ApplicationPart {
  id
  name
  variableValues {
    id
    environment {
      id
      name
    }
    variable {
      id
      name
    }
  }
  components {
    id
    definition {
      id
      name
    }
  }
}

fragment ExplorerTree_Applications on Query {
  applications(after: $cursor, first: $count) {
    edges {
      node {
        id
        ...ExplorerTree_Application
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
v2 = [
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableValue",
  "kind": "LinkedField",
  "name": "variableValues",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environment",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExplorerTreeQuery",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ExplorerTreeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "if": null,
                    "kind": "Defer",
                    "label": "ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails",
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "parts",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "if": null,
                            "kind": "Defer",
                            "label": "ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ApplicationPartComponent",
                                "kind": "LinkedField",
                                "name": "components",
                                "plural": true,
                                "selections": [
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Component",
                                    "kind": "LinkedField",
                                    "name": "definition",
                                    "plural": false,
                                    "selections": (v5/*: any*/),
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "Query_applications",
        "kind": "LinkedHandle",
        "name": "applications"
      }
    ]
  },
  "params": {
    "cacheID": "1554187ead3cf72bd1664c40f807ed94",
    "id": null,
    "metadata": {},
    "name": "ExplorerTreeQuery",
    "operationKind": "query",
    "text": "query ExplorerTreeQuery(\n  $cursor: String\n  $count: Int\n) {\n  ...ExplorerTree_Applications\n}\n\nfragment ExplorerTree_Application on Application {\n  id\n  name\n  ...ExplorerTree_ApplicationDetails @defer(label: \"ExplorerTree_Application$defer$ExplorerTree_ApplicationDetails\")\n}\n\nfragment ExplorerTree_ApplicationDetails on Application {\n  variableValues {\n    id\n    environment {\n      id\n      name\n    }\n    variable {\n      id\n      name\n    }\n  }\n  parts {\n    id\n    name\n    ...ExplorerTree_ApplicationPart @defer(label: \"ExplorerTree_ApplicationDetails$defer$ExplorerTree_ApplicationPart\")\n  }\n}\n\nfragment ExplorerTree_ApplicationPart on ApplicationPart {\n  id\n  name\n  variableValues {\n    id\n    environment {\n      id\n      name\n    }\n    variable {\n      id\n      name\n    }\n  }\n  components {\n    id\n    definition {\n      id\n      name\n    }\n  }\n}\n\nfragment ExplorerTree_Applications on Query {\n  applications(after: $cursor, first: $count) {\n    edges {\n      node {\n        id\n        ...ExplorerTree_Application\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6c9cdae74916fd73591ecf5047d92e10';
export default node;
