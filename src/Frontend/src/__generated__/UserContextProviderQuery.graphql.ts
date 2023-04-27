/**
 * @generated SignedSource<<8e123c8d2aae6bb84a638777cb9f1dfe>>
 * @relayHash f69ddc6e58b268697ac9a0358f1c0ac8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f69ddc6e58b268697ac9a0358f1c0ac8

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserContextProviderQuery$variables = {};
export type UserContextProviderQuery$data = {
  readonly me: {
    readonly applicationNamespaces: ReadonlyArray<{
      readonly namespace: string;
      readonly permission: {
        readonly isRead: boolean;
        readonly isWrite: boolean;
      };
    }>;
    readonly componentNamespaces: ReadonlyArray<{
      readonly namespace: string;
      readonly permission: {
        readonly isRead: boolean;
        readonly isWrite: boolean;
      };
    }>;
    readonly environmentGrants: ReadonlyArray<{
      readonly permission: {
        readonly isRead: boolean;
      };
    }>;
    readonly identityGrants: ReadonlyArray<{
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isRead",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "namespace",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PermissionsFlags",
    "kind": "LinkedField",
    "name": "permission",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isWrite",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PermissionsFlags",
    "kind": "LinkedField",
    "name": "permission",
    "plural": false,
    "selections": [
      (v0/*: any*/)
    ],
    "storageKey": null
  }
],
v3 = [
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
        "selections": (v1/*: any*/),
        "storageKey": "namespaceGrants(scope:\"COMPONENT\")"
      },
      {
        "alias": "applicationNamespaces",
        "args": [
          {
            "kind": "Literal",
            "name": "scope",
            "value": "APPLICATION"
          }
        ],
        "concreteType": "Grant",
        "kind": "LinkedField",
        "name": "namespaceGrants",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": "namespaceGrants(scope:\"APPLICATION\")"
      },
      {
        "alias": "environmentGrants",
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
        "selections": (v2/*: any*/),
        "storageKey": "namespaceGrants(scope:\"ENVIRONMENT\")"
      },
      {
        "alias": "identityGrants",
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
        "selections": (v2/*: any*/),
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
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserContextProviderQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "f69ddc6e58b268697ac9a0358f1c0ac8",
    "metadata": {},
    "name": "UserContextProviderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "63343febca1ea87d9466ae950325c67b";

export default node;
