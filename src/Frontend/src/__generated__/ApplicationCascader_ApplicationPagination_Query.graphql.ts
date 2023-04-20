/**
 * @generated SignedSource<<117d8e1665592e91988f5d9a6d319996>>
 * @relayHash 389464849a319b1e711fc645ca3128df
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c2343eb53be416e2904824a1d85cfca6e0bf4dc2eedd941596792c4ba335ec3c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader_ApplicationPagination_Query$variables = {
  search?: string | null;
};
export type ApplicationCascader_ApplicationPagination_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Applications">;
};
export type ApplicationCascader_ApplicationPagination_Query = {
  response: ApplicationCascader_ApplicationPagination_Query$data;
  variables: ApplicationCascader_ApplicationPagination_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = {
  "kind": "Variable",
  "name": "search",
  "variableName": "search"
},
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplicationCascader_ApplicationPagination_Query",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "ApplicationCascader_Applications"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApplicationCascader_ApplicationPagination_Query",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 50
          },
          (v1/*: any*/)
        ],
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "namespace",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "parts",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
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
    ]
  },
  "params": {
    "id": "c2343eb53be416e2904824a1d85cfca6e0bf4dc2eedd941596792c4ba335ec3c",
    "metadata": {},
    "name": "ApplicationCascader_ApplicationPagination_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "55aba6a2ef3d2c59395799aab66a73a3";

export default node;
