/**
 * @generated SignedSource<<b86940b0e72e63199fe6b46122a46c1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
      readonly " $fragmentSpreads": FragmentRefs<"ComponentsList_componentEdge">;
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
    "name": "RenameComponentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ComponentsList_componentEdge"
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
    "name": "RenameComponentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "b9b4f7e89ed23c0a214977e0e0b2e82f",
    "id": null,
    "metadata": {},
    "name": "RenameComponentDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameComponentDialogMutation(\n  $input: RenameComponentInput!\n) {\n  renameComponent(input: $input) {\n    component {\n      id\n      ...ComponentsList_componentEdge\n    }\n  }\n}\n\nfragment ComponentsList_componentEdge on Component {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "b859dc61c7019cfc0a1456384c577db5";

export default node;
