/**
 * @generated SignedSource<<0ea849939bb0f61910462941501890d0>>
 * @relayHash 779c8a2d3bf75c505370dcd889dd863b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 09e9acf46a1fb9f2a2e55b3799f27dddd2dc7e8cec16ea34088810a2edd1306e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RenameGroupInput = {
  id: string;
  name: string;
};
export type RenameGroupDialogMutation$variables = {
  input: RenameGroupInput;
};
export type RenameGroupDialogMutation$data = {
  readonly renameGroup: {
    readonly group: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameGroupDialogMutation = {
  response: RenameGroupDialogMutation$data;
  variables: RenameGroupDialogMutation$variables;
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
    "concreteType": "RenameGroupPayload",
    "kind": "LinkedField",
    "name": "renameGroup",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Group",
        "kind": "LinkedField",
        "name": "group",
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
    "name": "RenameGroupDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RenameGroupDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "09e9acf46a1fb9f2a2e55b3799f27dddd2dc7e8cec16ea34088810a2edd1306e",
    "metadata": {},
    "name": "RenameGroupDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "182ad7182cf6185bfa2d8d18dcc4169f";

export default node;
