/**
 * @generated SignedSource<<9eb09431bd685ace2445591dc8a249d7>>
 * @relayHash 7f0e6e9f8e37b720490bab3446d06544
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7f0e6e9f8e37b720490bab3446d06544

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateVariableInput = {
  defaultValue?: string | null;
  isSecret: boolean;
  name: string;
  namespace: string;
  scope: VariableValueScopeInput;
};
export type VariableValueScopeInput = {
  application?: ApplicationVariableValueScopeInput | null;
  applicationPart?: ApplicationPartVariableValueScopeInput | null;
  namespace?: NamespaceVariableValueScopeInput | null;
};
export type ApplicationVariableValueScopeInput = {
  applicationId: string;
  environmentId?: string | null;
};
export type ApplicationPartVariableValueScopeInput = {
  environmentId?: string | null;
  partId: string;
};
export type NamespaceVariableValueScopeInput = {
  environmentId?: string | null;
  namespace: string;
};
export type NewVariableMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateVariableInput;
};
export type NewVariableMutation$data = {
  readonly createVariable: {
    readonly variable: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type NewVariableMutation = {
  response: NewVariableMutation$data;
  variables: NewVariableMutation$variables;
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
  "concreteType": "Variable",
  "kind": "LinkedField",
  "name": "variable",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewVariableMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateVariablePayload",
        "kind": "LinkedField",
        "name": "createVariable",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "NewVariableMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateVariablePayload",
        "kind": "LinkedField",
        "name": "createVariable",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "variable",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "VariablesEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "7f0e6e9f8e37b720490bab3446d06544",
    "metadata": {},
    "name": "NewVariableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "157656d75529e7a8ecc597545ad73d17";

export default node;
