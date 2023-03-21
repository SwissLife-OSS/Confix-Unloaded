/**
 * @generated SignedSource<<b741e4f28b1ba72cba6918d78c98a3e5>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ApiKeysList">;
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
        "name": "ApiKeysList"
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
    "cacheID": "4a6d520f324c72b4f724bf5481fb686d",
    "id": null,
    "metadata": {},
    "name": "ApiKeysListQuery",
    "operationKind": "query",
    "text": "query ApiKeysListQuery(\n  $cursor: String\n  $count: Int\n) {\n  ...ApiKeysList\n}\n\nfragment ApiKeysList on Query {\n  apiKeys(after: $cursor, first: $count) {\n    edges {\n      node {\n        id\n        name\n        ...ApiKeysList_ApiKeyListItem\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ApiKeysList_ApiKeyListItem on ApiKey {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "ce965f60a64d9781382b9fe75d2b0210";

export default node;
