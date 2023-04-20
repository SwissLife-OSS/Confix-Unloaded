/**
 * @generated SignedSource<<bad1619ae7e2bd27fcf1fb7005c3bc28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EnvironmentsSelectQuery$variables = {
  search: string;
};
export type EnvironmentsSelectQuery$data = {
  readonly searchEnvironments: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }> | null;
  } | null;
};
export type EnvironmentsSelectQuery = {
  response: EnvironmentsSelectQuery$data;
  variables: EnvironmentsSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EnvironmentsSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnvironmentsSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e8132324e5692bee4117bc4012db90dd",
    "id": null,
    "metadata": {},
    "name": "EnvironmentsSelectQuery",
    "operationKind": "query",
    "text": "query EnvironmentsSelectQuery(\n  $search: String!\n) {\n  searchEnvironments(search: $search) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cdaf90ca0adada9409ea9fba81a42fca";

export default node;
