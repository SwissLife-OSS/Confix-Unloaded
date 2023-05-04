/**
 * @generated SignedSource<<d7338d9efced498b7d6e2590265534b1>>
 * @relayHash 11d1065fedb081ec3f08371d919ade67
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 11d1065fedb081ec3f08371d919ade67

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteVariableValueInput = {
  id: string;
};
export type VariableEditorDeleteVariableValueMutation$variables = {
  input: DeleteVariableValueInput;
};
export type VariableEditorDeleteVariableValueMutation$data = {
  readonly deleteVariableValue: {
    readonly value: {
      readonly variable: {
        readonly id: string;
      } | null;
    } | null;
  };
};
export type VariableEditorDeleteVariableValueMutation = {
  response: VariableEditorDeleteVariableValueMutation$data;
  variables: VariableEditorDeleteVariableValueMutation$variables;
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
  "concreteType": "Variable",
  "kind": "LinkedField",
  "name": "variable",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VariableEditorDeleteVariableValueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteVariableValuePayload",
        "kind": "LinkedField",
        "name": "deleteVariableValue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VariableValue",
            "kind": "LinkedField",
            "name": "value",
            "plural": false,
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
    "name": "VariableEditorDeleteVariableValueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteVariableValuePayload",
        "kind": "LinkedField",
        "name": "deleteVariableValue",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VariableValue",
            "kind": "LinkedField",
            "name": "value",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "11d1065fedb081ec3f08371d919ade67",
    "metadata": {},
    "name": "VariableEditorDeleteVariableValueMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c556cd581bf649a4a039065e118d79e0";

export default node;
