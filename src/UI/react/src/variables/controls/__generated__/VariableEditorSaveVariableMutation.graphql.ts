/**
 * @generated SignedSource<<bbb902f47f6a8c7d89887c3358f3cea6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveVariableValueInput = {
  applicationId?: string | null;
  environmentId?: string | null;
  partId?: string | null;
  value: string;
  valueId?: string | null;
  variableId: string;
};
export type VariableEditorSaveVariableMutation$variables = {
  input: SaveVariableValueInput;
};
export type VariableEditorSaveVariableMutation$data = {
  readonly saveVariableValue: {
    readonly value: {
      readonly id: string;
      readonly value: string | null;
    } | null;
  };
};
export type VariableEditorSaveVariableMutation = {
  response: VariableEditorSaveVariableMutation$data;
  variables: VariableEditorSaveVariableMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SaveVariableValuePayload",
    "kind": "LinkedField",
    "name": "saveVariableValue",
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
            "name": "value",
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
    "name": "VariableEditorSaveVariableMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VariableEditorSaveVariableMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4bb8c24cfefe85b255c3529a5e108776",
    "id": null,
    "metadata": {},
    "name": "VariableEditorSaveVariableMutation",
    "operationKind": "mutation",
    "text": "mutation VariableEditorSaveVariableMutation(\n  $input: SaveVariableValueInput!\n) {\n  saveVariableValue(input: $input) {\n    value {\n      id\n      value\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "54889752de94756f3431fc0ff1fa57fa";

export default node;
