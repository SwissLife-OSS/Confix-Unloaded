/**
 * @generated SignedSource<<116e91886941abf72e7afcc4b8cb4b08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE" | "%future added value";
export type useUser_Me_Query$variables = {};
export type useUser_Me_Query$data = {
  readonly me: {
    readonly groups: ReadonlyArray<{
      readonly roles: ReadonlyArray<{
        readonly namespace: string;
        readonly roles: ReadonlyArray<{
          readonly name: string;
          readonly permissions: ReadonlyArray<{
            readonly permissions: {
              readonly isClaim: boolean;
              readonly isDecrypt: boolean;
              readonly isPublish: boolean;
              readonly isRead: boolean;
              readonly isWrite: boolean;
            };
            readonly scope: Scope;
          }>;
        }>;
      }>;
    }>;
    readonly name: string;
    readonly namespaces: ReadonlyArray<string>;
  } | null;
};
export type useUser_Me_Query = {
  response: useUser_Me_Query$data;
  variables: useUser_Me_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespaces",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespace",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Permission",
  "kind": "LinkedField",
  "name": "permissions",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "scope",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PermissionsFlags",
      "kind": "LinkedField",
      "name": "permissions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isRead",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isWrite",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClaim",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPublish",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDecrypt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUser_Me_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "groups",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RoleScope",
                "kind": "LinkedField",
                "name": "roles",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Role",
                    "kind": "LinkedField",
                    "name": "roles",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useUser_Me_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Group",
            "kind": "LinkedField",
            "name": "groups",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RoleScope",
                "kind": "LinkedField",
                "name": "roles",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Role",
                    "kind": "LinkedField",
                    "name": "roles",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d62f0c05ae8c2678f1b9eff85e42cb6c",
    "id": null,
    "metadata": {},
    "name": "useUser_Me_Query",
    "operationKind": "query",
    "text": "query useUser_Me_Query {\n  me {\n    name\n    namespaces\n    groups {\n      roles {\n        namespace\n        roles {\n          name\n          permissions {\n            scope\n            permissions {\n              isRead\n              isWrite\n              isClaim\n              isPublish\n              isDecrypt\n            }\n          }\n          id\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5d911a95babfe0528df9611868acf951";

export default node;