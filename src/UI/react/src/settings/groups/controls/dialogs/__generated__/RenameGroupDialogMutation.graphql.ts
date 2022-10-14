/**
 * @generated SignedSource<<ff73f3ff8ac2a0d2e958ad147bf765e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"GroupsList_GroupEdge">;
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
    "name": "RenameGroupDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "GroupsList_GroupEdge"
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
    "name": "RenameGroupDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "6ebe0b469687b74e23cd8566bc62e5e6",
    "id": null,
    "metadata": {},
    "name": "RenameGroupDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameGroupDialogMutation(\n  $input: RenameGroupInput!\n) {\n  renameGroup(input: $input) {\n    group {\n      id\n      ...GroupsList_GroupEdge\n    }\n  }\n}\n\nfragment GroupsList_GroupEdge on Group {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "42e917c7dcb8d9a784490fa0027d801e";

export default node;
