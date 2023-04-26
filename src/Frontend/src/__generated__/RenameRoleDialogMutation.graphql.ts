/**
 * @generated SignedSource<<fe41091094a3b0ecaf7ec822288114f3>>
 * @relayHash 0b6b18c087606c0db70ff725282c5a7a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0b6b18c087606c0db70ff725282c5a7a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RenameRoleInput = {
  id: string;
  name: string;
};
export type RenameRoleDialogMutation$variables = {
  input: RenameRoleInput;
};
export type RenameRoleDialogMutation$data = {
  readonly renameRole: {
    readonly role: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type RenameRoleDialogMutation = {
  response: RenameRoleDialogMutation$data;
  variables: RenameRoleDialogMutation$variables;
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
    "concreteType": "RenameRolePayload",
    "kind": "LinkedField",
    "name": "renameRole",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Role",
        "kind": "LinkedField",
        "name": "role",
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
    "name": "RenameRoleDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RenameRoleDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0b6b18c087606c0db70ff725282c5a7a",
    "metadata": {},
    "name": "RenameRoleDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c5f981256fd6c42376b7cca88f987536";

export default node;
