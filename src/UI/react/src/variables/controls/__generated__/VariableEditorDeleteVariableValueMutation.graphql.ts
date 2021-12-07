/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type DeleteVariableValueInput = {
    id: string;
};
export type VariableEditorDeleteVariableValueMutationVariables = {
    input: DeleteVariableValueInput;
};
export type VariableEditorDeleteVariableValueMutationResponse = {
    readonly deleteVariableValue: {
        readonly variable: {
            readonly id: string;
            readonly values: ReadonlyArray<{
                readonly id: string;
                readonly value: string;
            }>;
        } | null;
    };
};
export type VariableEditorDeleteVariableValueMutation = {
    readonly response: VariableEditorDeleteVariableValueMutationResponse;
    readonly variables: VariableEditorDeleteVariableValueMutationVariables;
};



/*
mutation VariableEditorDeleteVariableValueMutation(
  $input: DeleteVariableValueInput!
) {
  deleteVariableValue(input: $input) {
    variable {
      id
      values {
        id
        value
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteVariableValuePayload",
    "kind": "LinkedField",
    "name": "deleteVariableValue",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Variable",
        "kind": "LinkedField",
        "name": "variable",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "VariableValue",
            "kind": "LinkedField",
            "name": "values",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VariableEditorDeleteVariableValueMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VariableEditorDeleteVariableValueMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5cab0f695bbefbc04d86fc6d96301382",
    "id": null,
    "metadata": {},
    "name": "VariableEditorDeleteVariableValueMutation",
    "operationKind": "mutation",
    "text": "mutation VariableEditorDeleteVariableValueMutation(\n  $input: DeleteVariableValueInput!\n) {\n  deleteVariableValue(input: $input) {\n    variable {\n      id\n      values {\n        id\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a7d071d2a983f089340d07a6af46a294';
export default node;
