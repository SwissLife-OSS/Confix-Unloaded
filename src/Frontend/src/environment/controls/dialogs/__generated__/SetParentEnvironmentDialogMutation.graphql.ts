/**
 * @generated SignedSource<<d623dce43d600cedba57e95522a88f9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_Environment">;
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
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "path",
      "storageKey": null
    },
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "EnvironmentCycleDetectedError",
  "abstractKey": null
},
v6 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "environmentId",
      "storageKey": null
    },
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "EnvironmentNotFoundError",
  "abstractKey": null
},
v7 = {
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environment",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EditEnvironment_Environment"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
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
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environment",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "allowDeveloperAccess",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Environment",
                "kind": "LinkedField",
                "name": "parent",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b2a1c26249c120e9c74fa5ac64e83a8e",
    "id": null,
    "metadata": {},
    "name": "SetParentEnvironmentDialogMutation",
    "operationKind": "mutation",
    "text": "mutation SetParentEnvironmentDialogMutation(\n  $input: SetParentOfEnvironmentInput!\n) {\n  setParentOfEnvironment(input: $input) {\n    environment {\n      id\n      ...EditEnvironment_Environment\n    }\n    errors {\n      __typename\n      ... on EnvironmentCycleDetectedError {\n        path\n        code\n        message\n      }\n      ... on EnvironmentNotFoundError {\n        environmentId\n        code\n        message\n      }\n    }\n  }\n}\n\nfragment EditEnvironment_Environment on Environment {\n  id\n  name\n  allowDeveloperAccess\n  parent {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "a8721a008fb26c79773c7e633d67d03e";

export default node;
