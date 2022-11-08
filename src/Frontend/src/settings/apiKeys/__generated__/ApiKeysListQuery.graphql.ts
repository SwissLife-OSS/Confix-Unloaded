/**
 * @generated SignedSource<<35dee7df2f99a7b3c685d6a36caa8c70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiKeysListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
};
export type ApiKeysListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApiKeysList_ApiKeys">;
};
export type ApiKeysListQuery = {
  response: ApiKeysListQuery$data;
  variables: ApiKeysListQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ApiKeysListQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ApiKeysList_ApiKeys"
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
    "name": "ApiKeysListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "ApiKeysConnection",
        "kind": "LinkedField",
        "name": "apiKeys",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKeysEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ApiKey",
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "Query__apiKeys",
        "kind": "LinkedHandle",
        "name": "apiKeys"
      }
    ]
  },
  "params": {
    "cacheID": "c314083b6fab9a9496080368300005ae",
    "id": null,
    "metadata": {},
    "name": "ApiKeysListQuery",
    "operationKind": "query",
    "text": "query ApiKeysListQuery(\n  $cursor: String\n  $count: Int\n) {\n  ...ApiKeysList_ApiKeys\n}\n\nfragment ApiKeysList_ApiKeyEdge on ApiKey {\n  id\n  name\n}\n\nfragment ApiKeysList_ApiKeys on Query {\n  apiKeys(after: $cursor, first: $count) {\n    edges {\n      node {\n        id\n        name\n        ...ApiKeysList_ApiKeyEdge\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "52aed0d503214134f7dd8fc6b4b14a86";

export default node;
