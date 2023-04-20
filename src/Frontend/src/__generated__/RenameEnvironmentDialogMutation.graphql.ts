/**
 * @generated SignedSource<<11810fead6826fae6433363707f75741>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RenameEnvironmentInput = {
  id: string;
  name: string;
};
export type RenameEnvironmentDialogMutation$variables = {
  input: RenameEnvironmentInput;
};
export type RenameEnvironmentDialogMutation$data = {
  readonly renameEnvironment: {
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameEnvironmentDialogMutation = {
  response: RenameEnvironmentDialogMutation$data;
  variables: RenameEnvironmentDialogMutation$variables;
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
    "concreteType": "RenameEnvironmentPayload",
    "kind": "LinkedField",
    "name": "renameEnvironment",
    "plural": false,
    "selections": [
      {
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
            "name": "name",
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
    "name": "RenameEnvironmentDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RenameEnvironmentDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "12048afc12af5fcebc78edf925f4d375",
    "id": null,
    "metadata": {},
    "name": "RenameEnvironmentDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameEnvironmentDialogMutation(\n  $input: RenameEnvironmentInput!\n) {\n  renameEnvironment(input: $input) {\n    environment {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "513ba7bef3770542943aa990aa89d2f7";

export default node;
