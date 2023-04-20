/**
 * @generated SignedSource<<14ea82574ba4b8184937246a41278677>>
 * @relayHash 4a2099fe01acecfda537932b40f1d993
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f0e5245484826d191d8cacad99265efbf7436aca37a625f5585146f97aa21e35

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditEnvironmentQuery$variables = {
  id: string;
};
export type EditEnvironmentQuery$data = {
  readonly environmentById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_EditEnvironmentForm">;
  } | null;
};
export type EditEnvironmentQuery = {
  response: EditEnvironmentQuery$data;
  variables: EditEnvironmentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditEnvironmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environmentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditEnvironment_EditEnvironmentForm"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditEnvironmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environmentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "parent",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "allowDeveloperAccess",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f0e5245484826d191d8cacad99265efbf7436aca37a625f5585146f97aa21e35",
    "metadata": {},
    "name": "EditEnvironmentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4955fac7ae0d1b6be773ffaee574f66e";

export default node;
