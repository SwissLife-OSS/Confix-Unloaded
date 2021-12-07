/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RenameEnvironmentInput = {
    id: string;
    name: string;
};
export type RenameEnvironmentDialogMutationVariables = {
    input: RenameEnvironmentInput;
};
export type RenameEnvironmentDialogMutationResponse = {
    readonly renameEnvironment: {
        readonly environment: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EnvironmentsList_EnvironmentEdge">;
        } | null;
    };
};
export type RenameEnvironmentDialogMutation = {
    readonly response: RenameEnvironmentDialogMutationResponse;
    readonly variables: RenameEnvironmentDialogMutationVariables;
};



/*
mutation RenameEnvironmentDialogMutation(
  $input: RenameEnvironmentInput!
) {
  renameEnvironment(input: $input) {
    environment {
      id
      ...EnvironmentsList_EnvironmentEdge
    }
  }
}

fragment EnvironmentsList_EnvironmentEdge on Environment {
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
    "name": "RenameEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "EnvironmentsList_EnvironmentEdge"
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
    "name": "RenameEnvironmentDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "7827004bd6b9b4a47d0e16c0111bbc04",
    "id": null,
    "metadata": {},
    "name": "RenameEnvironmentDialogMutation",
    "operationKind": "mutation",
    "text": "mutation RenameEnvironmentDialogMutation(\n  $input: RenameEnvironmentInput!\n) {\n  renameEnvironment(input: $input) {\n    environment {\n      id\n      ...EnvironmentsList_EnvironmentEdge\n    }\n  }\n}\n\nfragment EnvironmentsList_EnvironmentEdge on Environment {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = 'd70fa7e52bc51e2934286c5cd837af05';
export default node;
