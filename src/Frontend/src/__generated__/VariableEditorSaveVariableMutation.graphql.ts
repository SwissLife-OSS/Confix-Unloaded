/**
 * @generated SignedSource<<2e8ce5f290ad04826f8c78785db1d92b>>
 * @relayHash 4bb8c24cfefe85b255c3529a5e108776
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4bb8c24cfefe85b255c3529a5e108776

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveVariableValueInput = {
  reference: VariableValueScopeInput;
  value: string;
  variableId: string;
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
export type VariableEditorSaveVariableMutation$variables = {
  input: SaveVariableValueInput;
};
export type VariableEditorSaveVariableMutation$data = {
  readonly saveVariableValue: {
    readonly value: {
      readonly id: string;
      readonly value: string;
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
    "id": "4bb8c24cfefe85b255c3529a5e108776",
    "metadata": {},
    "name": "VariableEditorSaveVariableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "54889752de94756f3431fc0ff1fa57fa";

export default node;
