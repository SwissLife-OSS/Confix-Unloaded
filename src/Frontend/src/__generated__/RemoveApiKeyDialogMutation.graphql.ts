/**
 * @generated SignedSource<<b7000e77acdaff5586d176a2cff3c265>>
 * @relayHash d4eb374cd146d0ca090c0255cf1cd98e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ebf6356012a3d0c4ba4b9b388fb81076c44ef21aaee3a1e51bec4cc957319cfd

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveApiKeyByIdInput = {
  id: string;
};
export type RemoveApiKeyDialogMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: RemoveApiKeyByIdInput;
};
export type RemoveApiKeyDialogMutation$data = {
  readonly removeApiKeyById: {
    readonly apiKey: {
      readonly id: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type RemoveApiKeyDialogMutation = {
  response: RemoveApiKeyDialogMutation$data;
  variables: RemoveApiKeyDialogMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connectionIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
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
    {
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveApiKeyDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveApiKeyByIdPayload",
        "kind": "LinkedField",
        "name": "removeApiKeyById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RemoveApiKeyDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveApiKeyByIdPayload",
        "kind": "LinkedField",
        "name": "removeApiKeyById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ApiKey",
            "kind": "LinkedField",
            "name": "apiKey",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connectionIds"
                  }
                ]
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ebf6356012a3d0c4ba4b9b388fb81076c44ef21aaee3a1e51bec4cc957319cfd",
    "metadata": {},
    "name": "RemoveApiKeyDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "f62bb2faf51ad707e7e8a24094b24b11";

export default node;
