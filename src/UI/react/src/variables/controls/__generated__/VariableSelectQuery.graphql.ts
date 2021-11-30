/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type VariableSelectQueryVariables = {
    search?: string | null | undefined;
};
export type VariableSelectQueryResponse = {
    readonly searchVariables: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            };
        }> | null;
    } | null;
};
export type VariableSelectQuery = {
    readonly response: VariableSelectQueryResponse;
    readonly variables: VariableSelectQueryVariables;
};



/*
query VariableSelectQuery(
  $search: String
) {
  searchVariables(search: $search) {
    edges {
      node {
        id
        name
      }
    }
  }
}
*/

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
    "name": "VariableSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VariableSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fd744c38bb7257b888a8ad54362a5a1f",
    "id": null,
    "metadata": {},
    "name": "VariableSelectQuery",
    "operationKind": "query",
    "text": "query VariableSelectQuery(\n  $search: String\n) {\n  searchVariables(search: $search) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7cd7565e65cda8d072ef74a58ada5b5e';
export default node;
