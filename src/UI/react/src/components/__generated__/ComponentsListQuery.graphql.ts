/**
 * @generated SignedSource<<e341cc56ca86b829cb5d4e048a4993a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ComponentsListQuery$variables = {
  count?: number | null;
  cursor?: string | null;
};
export type ComponentsListQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ComponentsList_components">;
};
export type ComponentsListQuery = {
  response: ComponentsListQuery$data;
  variables: ComponentsListQuery$variables;
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
    "name": "ComponentsListQuery",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ComponentsListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "Query_components",
        "kind": "LinkedHandle",
        "name": "components"
      }
    ]
  },
  "params": {
    "cacheID": "b0fba9b04657a476499e2f156f82b2d1",
    "id": null,
    "metadata": {},
    "name": "ComponentsListQuery",
    "operationKind": "query",
    "text": "query ComponentsListQuery(\n  $cursor: String\n  $count: Int\n) {\n  ...ComponentsList_components\n}\n\nfragment ComponentsList_componentEdge on Component {\n  id\n  name\n}\n\nfragment ComponentsList_components on Query {\n  components(after: $cursor, first: $count) {\n    edges {\n      node {\n        ...ComponentsList_componentEdge\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa8e804ce96076e79b6ff152a440b2f5";

export default node;
