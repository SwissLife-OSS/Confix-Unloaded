/**
 * @generated SignedSource<<e2c7b1279cc702b776587a51e6f51018>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "4a2099fe01acecfda537932b40f1d993",
    "id": null,
    "metadata": {},
    "name": "EditEnvironmentQuery",
    "operationKind": "query",
    "text": "query EditEnvironmentQuery(\n  $id: ID!\n) {\n  environmentById(id: $id) {\n    id\n    ...EditEnvironment_EditEnvironmentForm\n  }\n}\n\nfragment EditEnvironment_EditEnvironmentForm on Environment {\n  id\n  name\n  ...EditEnvironment_ParentEnvironement\n  ...EditEnvironment_IsDeveloperAccessAllowedFrom\n  ...EditEnvironment_Header\n}\n\nfragment EditEnvironment_Header on Environment {\n  id\n  name\n}\n\nfragment EditEnvironment_IsDeveloperAccessAllowedFrom on Environment {\n  id\n  allowDeveloperAccess\n}\n\nfragment EditEnvironment_ParentEnvironement on Environment {\n  id\n  name\n  parent {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "4955fac7ae0d1b6be773ffaee574f66e";

export default node;
