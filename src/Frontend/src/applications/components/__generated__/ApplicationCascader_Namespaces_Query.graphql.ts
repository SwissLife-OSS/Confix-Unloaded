/**
 * @generated SignedSource<<9c48b8b7f57f25dd27d2b19121898b98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader_Namespaces_Query$variables = {};
export type ApplicationCascader_Namespaces_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Namespaces">;
};
export type ApplicationCascader_Namespaces_Query = {
  response: ApplicationCascader_Namespaces_Query$data;
  variables: ApplicationCascader_Namespaces_Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplicationCascader_Namespaces_Query",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ApplicationCascader_Namespaces"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ApplicationCascader_Namespaces_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "namespaces",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cc9f53e0e44d0df96d0f3c618444e06f",
    "id": null,
    "metadata": {},
    "name": "ApplicationCascader_Namespaces_Query",
    "operationKind": "query",
    "text": "query ApplicationCascader_Namespaces_Query {\n  ...ApplicationCascader_Namespaces\n}\n\nfragment ApplicationCascader_Namespaces on Query {\n  me {\n    namespaces\n  }\n}\n"
  }
};

(node as any).hash = "85f09b45fd9138454950249d3f3132a1";

export default node;
