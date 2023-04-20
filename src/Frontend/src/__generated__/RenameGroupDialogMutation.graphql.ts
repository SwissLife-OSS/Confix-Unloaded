/**
 * @generated SignedSource<<e0e3e990232e5db051254bd2b41315e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "779c8a2d3bf75c505370dcd889dd863b",
    "id": null,
    "metadata": {},
    "name": "RenameGroupDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameGroupDialogMutation(\n  $input: RenameGroupInput!\n) {\n  renameGroup(input: $input) {\n    group {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "182ad7182cf6185bfa2d8d18dcc4169f";

export default node;
