/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CompareApplicationPartComponentVersions_QueryVariables = {
    partComponentId: string;
    from: number;
    to: number;
};
export type CompareApplicationPartComponentVersions_QueryResponse = {
    readonly applicationPartComponentById: {
        readonly version: number;
        readonly fromValues: string | null;
        readonly toValues: string | null;
        readonly changeLog: ReadonlyArray<{
            readonly change: {
                readonly partComponentVersion?: number | undefined;
            };
        }>;
    } | null;
};
export type CompareApplicationPartComponentVersions_Query = {
    readonly response: CompareApplicationPartComponentVersions_QueryResponse;
    readonly variables: CompareApplicationPartComponentVersions_QueryVariables;
};



/*
query CompareApplicationPartComponentVersions_Query(
  $partComponentId: ID!
  $from: Int!
  $to: Int!
) {
  applicationPartComponentById(partComponentId: $partComponentId) {
    version
    fromValues: values(version: $from)
    toValues: values(version: $to)
    changeLog {
      change {
        __typename
        ... on ApplicationPartComponentValuesChange {
          partComponentVersion
        }
      }
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "from"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "partComponentId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "to"
},
v3 = [
  {
    "kind": "Variable",
    "name": "partComponentId",
    "variableName": "partComponentId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "version",
  "storageKey": null
},
v5 = {
  "alias": "fromValues",
  "args": [
    {
      "kind": "Variable",
      "name": "version",
      "variableName": "from"
    }
  ],
  "kind": "ScalarField",
  "name": "values",
  "storageKey": null
},
v6 = {
  "alias": "toValues",
  "args": [
    {
      "kind": "Variable",
      "name": "version",
      "variableName": "to"
    }
  ],
  "kind": "ScalarField",
  "name": "values",
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partComponentVersion",
      "storageKey": null
    }
  ],
  "type": "ApplicationPartComponentValuesChange",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CompareApplicationPartComponentVersions_Query",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ApplicationPartComponent",
        "kind": "LinkedField",
        "name": "applicationPartComponentById",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ChangeLog",
            "kind": "LinkedField",
            "name": "changeLog",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "change",
                "plural": false,
                "selections": [
                  (v7/*: any*/)
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CompareApplicationPartComponentVersions_Query",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "ApplicationPartComponent",
        "kind": "LinkedField",
        "name": "applicationPartComponentById",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ChangeLog",
            "kind": "LinkedField",
            "name": "changeLog",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "change",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7e9f8ff03c5b1c1111f3c11e8137c580",
    "id": null,
    "metadata": {},
    "name": "CompareApplicationPartComponentVersions_Query",
    "operationKind": "query",
    "text": "query CompareApplicationPartComponentVersions_Query(\n  $partComponentId: ID!\n  $from: Int!\n  $to: Int!\n) {\n  applicationPartComponentById(partComponentId: $partComponentId) {\n    version\n    fromValues: values(version: $from)\n    toValues: values(version: $to)\n    changeLog {\n      change {\n        __typename\n        ... on ApplicationPartComponentValuesChange {\n          partComponentVersion\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fd87212d73721a6f76bbf2ea70786b36';
export default node;
