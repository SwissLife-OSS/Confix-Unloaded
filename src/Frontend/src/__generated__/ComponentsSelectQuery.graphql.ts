/**
 * @generated SignedSource<<a01717eef3eacf206e18c611eb360a6e>>
 * @relayHash 36ebeb037f6dbc968a55908e6cef901a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b81986851bafb0a2252250d71dfca4fee9b364c063f6aa6c65703af1ee0c8d34

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
    "id": "b81986851bafb0a2252250d71dfca4fee9b364c063f6aa6c65703af1ee0c8d34",
    "metadata": {},
    "name": "ComponentsSelectQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "656b8984d1248995ccbedb132b55360c";

export default node;
