/**
 * @generated SignedSource<<f682f84c81000d99f7bde530d86a717e>>
 * @relayHash fd744c38bb7257b888a8ad54362a5a1f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fd744c38bb7257b888a8ad54362a5a1f

import { ConcreteRequest, Query } from 'relay-runtime';
export type VariableSelectQuery$variables = {
  search?: string | null;
};
export type VariableSelectQuery$data = {
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
  response: VariableSelectQuery$data;
  variables: VariableSelectQuery$variables;
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
    "id": "fd744c38bb7257b888a8ad54362a5a1f",
    "metadata": {},
    "name": "VariableSelectQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7cd7565e65cda8d072ef74a58ada5b5e";

export default node;
