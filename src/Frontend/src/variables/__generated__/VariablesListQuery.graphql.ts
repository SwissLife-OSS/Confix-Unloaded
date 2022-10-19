/**
 * @generated SignedSource<<7bb06eac9f51116c1500f2afa7153334>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariablesListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  search?: string | null;
};
export type VariablesListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"VariablesList_Variables">;
};
export type VariablesListQuery = {
  response: VariablesListQuery$data;
  variables: VariablesListQuery$variables;
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
    "name": "VariablesListQuery",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "VariablesListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
        "args": (v3/*: any*/),
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
    "cacheID": "a699002ce286e118e3d560887d9ecb6b",
    "id": null,
    "metadata": {},
    "name": "VariablesListQuery",
    "operationKind": "query",
    "text": "query VariablesListQuery(\n  $cursor: String\n  $count: Int\n  $search: String\n) {\n  ...VariablesList_Variables\n}\n\nfragment VariablesList_VariableEdge on Variable {\n  id\n  name\n}\n\nfragment VariablesList_Variables on Query {\n  searchVariables(after: $cursor, first: $count, search: $search) {\n    edges {\n      node {\n        id\n        name\n        ...VariablesList_VariableEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6366291965ac231c705893cb3e2d0a2c";

export default node;
