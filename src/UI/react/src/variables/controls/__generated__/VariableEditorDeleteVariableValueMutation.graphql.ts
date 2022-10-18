/**
 * @generated SignedSource<<f11e8054acd9d9a16c1cf58d68c09ba6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
        readonly values: ReadonlyArray<{
          readonly id: string;
          readonly value: string | null;
        }>;
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
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "values",
      "plural": true,
      "selections": [
        (v2/*: any*/),
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
    "cacheID": "62a91288ebb43ae99a3664aad0603418",
    "id": null,
    "metadata": {},
    "name": "VariableEditorDeleteVariableValueMutation",
    "operationKind": "mutation",
    "text": "mutation VariableEditorDeleteVariableValueMutation(\n  $input: DeleteVariableValueInput!\n) {\n  deleteVariableValue(input: $input) {\n    value {\n      variable {\n        id\n        values {\n          id\n          value\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "711576a5c5587d42d641470381d523bd";

export default node;
