/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RenameVariableInput = {
    id: string;
    name: string;
};
export type RenameVariableDialogMutationVariables = {
    input: RenameVariableInput;
};
export type RenameVariableDialogMutationResponse = {
    readonly renameVariable: {
        readonly variable: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"VariablesList_VariableEdge">;
        } | null;
    };
};
export type RenameVariableDialogMutation = {
    readonly response: RenameVariableDialogMutationResponse;
    readonly variables: RenameVariableDialogMutationVariables;
};



/*
mutation RenameVariableDialogMutation(
  $input: RenameVariableInput!
) {
  renameVariable(input: $input) {
    variable {
      id
      ...VariablesList_VariableEdge
    }
  }
}

fragment VariablesList_VariableEdge on Variable {
  id
  name
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RenameVariableDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameVariablePayload",
        "kind": "LinkedField",
        "name": "renameVariable",
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "VariablesList_VariableEdge"
              }
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
    "name": "RenameVariableDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RenameVariablePayload",
        "kind": "LinkedField",
        "name": "renameVariable",
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "55817aed5e5873996aef951cdd22c3bc",
    "id": null,
    "metadata": {},
    "name": "RenameVariableDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameVariableDialogMutation(\n  $input: RenameVariableInput!\n) {\n  renameVariable(input: $input) {\n    variable {\n      id\n      ...VariablesList_VariableEdge\n    }\n  }\n}\n\nfragment VariablesList_VariableEdge on Variable {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = '1a2b0d88f368062790f5faff5c8f785a';
export default node;
