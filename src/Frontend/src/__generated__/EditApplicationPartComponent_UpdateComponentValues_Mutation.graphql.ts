/**
 * @generated SignedSource<<693375f323ec79ab25ac8d0b3d23dcdc>>
 * @relayHash 148e1dda2330a3ca039ede258e15ce3b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 059fbd101349e9db76cdf42d2e6958f491cdb2300a09ef3893e00d3c61cd82bc

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateApplicationPartComponentValuesInput = {
  partComponentId: string;
  values?: any | null;
};
export type EditApplicationPartComponent_UpdateComponentValues_Mutation$variables = {
  input: UpdateApplicationPartComponentValuesInput;
};
export type EditApplicationPartComponent_UpdateComponentValues_Mutation$data = {
  readonly updateApplicationPartComponentValues: {
    readonly component: {
      readonly values: string | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type EditApplicationPartComponent_UpdateComponentValues_Mutation = {
  response: EditApplicationPartComponent_UpdateComponentValues_Mutation$data;
  variables: EditApplicationPartComponent_UpdateComponentValues_Mutation$variables;
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
  "name": "values",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    }
  ],
  "type": "UserError",
  "abstractKey": "__isUserError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApplicationPartComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateApplicationPartComponentValues",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPartComponent",
            "kind": "LinkedField",
            "name": "component",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
              (v3/*: any*/)
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
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateApplicationPartComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateApplicationPartComponentValues",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPartComponent",
            "kind": "LinkedField",
            "name": "component",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "059fbd101349e9db76cdf42d2e6958f491cdb2300a09ef3893e00d3c61cd82bc",
    "metadata": {},
    "name": "EditApplicationPartComponent_UpdateComponentValues_Mutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "29b66ea213aa49bd3ec6ee7d8b9b0e1b";

export default node;
