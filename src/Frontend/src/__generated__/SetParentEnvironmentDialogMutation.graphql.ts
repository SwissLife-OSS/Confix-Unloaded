/**
 * @generated SignedSource<<eee61265e06136e330e4888d4443f59d>>
 * @relayHash ebf5fede012aa325e91e94753ef9f54b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 32e616aa59256fa14528d58f83b2d6b693eaef2145e20783730dd2445b9ff888

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetParentOfEnvironmentInput = {
  environmentId: string;
  parentId: string;
};
export type SetParentEnvironmentDialogMutation$variables = {
  input: SetParentOfEnvironmentInput;
};
export type SetParentEnvironmentDialogMutation$data = {
  readonly setParentOfEnvironment: {
    readonly environment: {
      readonly id: string;
      readonly parent: {
        readonly id: string;
        readonly name: string;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly environmentId?: string;
      readonly message?: string;
      readonly path?: ReadonlyArray<string>;
    }> | null;
  };
};
export type SetParentEnvironmentDialogMutation = {
  response: SetParentEnvironmentDialogMutation$data;
  variables: SetParentEnvironmentDialogMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "parent",
      "plural": false,
      "selections": [
        (v2/*: any*/),
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "path",
      "storageKey": null
    },
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "type": "EnvironmentCycleDetectedError",
  "abstractKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "environmentId",
      "storageKey": null
    },
    (v4/*: any*/),
    (v5/*: any*/)
  ],
  "type": "EnvironmentNotFoundError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SetParentEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetParentOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setParentOfEnvironment",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetParentEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetParentOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setParentOfEnvironment",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "32e616aa59256fa14528d58f83b2d6b693eaef2145e20783730dd2445b9ff888",
    "metadata": {},
    "name": "SetParentEnvironmentDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a1dfe04b42de720cba1ad8dd01264989";

export default node;
