/**
 * @generated SignedSource<<529e8a80332201c3074c6c70bd8a49db>>
 * @relayHash b9be59602a1e934e51d29e708f44f056
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b9be59602a1e934e51d29e708f44f056

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetDeveloperAccessOfEnvironmentInput = {
  environmentId: string;
  isAllowed: boolean;
};
export type SaveDeveloperAccessButtonMutation$variables = {
  input: SetDeveloperAccessOfEnvironmentInput;
};
export type SaveDeveloperAccessButtonMutation$data = {
  readonly setDeveloperAccessOfEnvironment: {
    readonly environment: {
      readonly allowDeveloperAccess: boolean;
      readonly id: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly environmentId?: string;
      readonly message?: string;
    }> | null;
  };
};
export type SaveDeveloperAccessButtonMutation = {
  response: SaveDeveloperAccessButtonMutation$data;
  variables: SaveDeveloperAccessButtonMutation$variables;
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
  "concreteType": "Environment",
  "kind": "LinkedField",
  "name": "environment",
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
      "name": "allowDeveloperAccess",
      "storageKey": null
    }
  ],
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
      "name": "environmentId",
      "storageKey": null
    },
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "type": "EnvironmentNotFoundError",
  "abstractKey": null
},
v6 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "UnauthorizedOperationError",
  "abstractKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "UserError",
  "abstractKey": "__isUserError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SaveDeveloperAccessButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDeveloperAccessOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setDeveloperAccessOfEnvironment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
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
    "name": "SaveDeveloperAccessButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetDeveloperAccessOfEnvironmentPayload",
        "kind": "LinkedField",
        "name": "setDeveloperAccessOfEnvironment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b9be59602a1e934e51d29e708f44f056",
    "metadata": {},
    "name": "SaveDeveloperAccessButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "40dbd385234b3fc65abb27003555755f";

export default node;
