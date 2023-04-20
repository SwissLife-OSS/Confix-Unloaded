/**
 * @generated SignedSource<<214ee19436f9f8b22415ea544453dcf8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ComponentsSelectQuery$variables = {
  applicationId?: string | null;
  applicationPartId?: string | null;
  namespace?: string | null;
  search?: string | null;
};
export type ComponentsSelectQuery$data = {
  readonly components: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }> | null;
  } | null;
};
export type ComponentsSelectQuery = {
  response: ComponentsSelectQuery$data;
  variables: ComponentsSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "applicationId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "applicationPartId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "namespace"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "search"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "applicationId",
        "variableName": "applicationId"
      },
      {
        "kind": "Variable",
        "name": "applicationPartId",
        "variableName": "applicationPartId"
      },
      {
        "kind": "Variable",
        "name": "namespace",
        "variableName": "namespace"
      },
      {
        "kind": "Variable",
        "name": "search",
        "variableName": "search"
      }
    ],
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ComponentsSelectQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ComponentsSelectQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "36ebeb037f6dbc968a55908e6cef901a",
    "id": null,
    "metadata": {},
    "name": "ComponentsSelectQuery",
    "operationKind": "query",
    "text": "query ComponentsSelectQuery(\n  $search: String\n  $applicationId: ID\n  $applicationPartId: ID\n  $namespace: String\n) {\n  components(search: $search, applicationId: $applicationId, applicationPartId: $applicationPartId, namespace: $namespace) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "656b8984d1248995ccbedb132b55360c";

export default node;
