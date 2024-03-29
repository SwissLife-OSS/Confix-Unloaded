/**
 * @generated SignedSource<<d2f1b4dd9a4d2f1aa6eb788791dc71cf>>
 * @relayHash 7b3c13b1f51a454b363f74e3c8c48a61
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7b3c13b1f51a454b363f74e3c8c48a61

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RenameComponentInput = {
  id: string;
  name: string;
};
export type RenameComponentDialogMutation$variables = {
  input: RenameComponentInput;
};
export type RenameComponentDialogMutation$data = {
  readonly renameComponent: {
    readonly component: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameComponentDialogMutation = {
  response: RenameComponentDialogMutation$data;
  variables: RenameComponentDialogMutation$variables;
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
    "concreteType": "RenameComponentPayload",
    "kind": "LinkedField",
    "name": "renameComponent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
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
    "name": "RenameComponentDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RenameComponentDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "7b3c13b1f51a454b363f74e3c8c48a61",
    "metadata": {},
    "name": "RenameComponentDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2aad54d597cbbe839a6194c71002c89a";

export default node;
