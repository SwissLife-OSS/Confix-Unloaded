/**
 * @generated SignedSource<<a376aa6916b3de741340596c2d3e654a>>
 * @relayHash d0987934bc8ebbe31c410a25e2eec9e6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d0987934bc8ebbe31c410a25e2eec9e6

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserContextProviderQuery$variables = {};
export type UserContextProviderQuery$data = {
  readonly me: {
    readonly componentNamespaces: ReadonlyArray<{
      readonly namespace: string;
    }>;
    readonly environmentNamespaces: ReadonlyArray<{
      readonly permission: {
        readonly isRead: boolean;
      };
    }>;
    readonly identityNamespaces: ReadonlyArray<{
      readonly permission: {
        readonly isRead: boolean;
      };
    }>;
    readonly name: string;
  } | null;
};
export type UserContextProviderQuery = {
  response: UserContextProviderQuery$data;
  variables: UserContextProviderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PermissionsFlags",
    "kind": "LinkedField",
    "name": "permission",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isRead",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v1 = [
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": "componentNamespaces",
        "args": [
          {
            "kind": "Literal",
            "name": "scope",
            "value": "COMPONENT"
          }
        ],
        "concreteType": "Grant",
        "kind": "LinkedField",
        "name": "namespaceGrants",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "namespace",
            "storageKey": null
          }
        ],
        "storageKey": "namespaceGrants(scope:\"COMPONENT\")"
      },
      {
        "alias": "environmentNamespaces",
        "args": [
          {
            "kind": "Literal",
            "name": "scope",
            "value": "ENVIRONMENT"
          }
        ],
        "concreteType": "Grant",
        "kind": "LinkedField",
        "name": "namespaceGrants",
        "plural": true,
        "selections": (v0/*: any*/),
        "storageKey": "namespaceGrants(scope:\"ENVIRONMENT\")"
      },
      {
        "alias": "identityNamespaces",
        "args": [
          {
            "kind": "Literal",
            "name": "scope",
            "value": "IDENTITY"
          }
        ],
        "concreteType": "Grant",
        "kind": "LinkedField",
        "name": "namespaceGrants",
        "plural": true,
        "selections": (v0/*: any*/),
        "storageKey": "namespaceGrants(scope:\"IDENTITY\")"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserContextProviderQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserContextProviderQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d0987934bc8ebbe31c410a25e2eec9e6",
    "metadata": {},
    "name": "UserContextProviderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7c04fb73e46453c17b1767584f2ef7d9";

export default node;
