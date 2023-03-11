/**
 * @generated SignedSource<<9964f30cedb6fd0c32beb66375d27c2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateComponentScopesInput = {
  id: string;
  scopes: ReadonlyArray<ComponentScopeInput>;
};
export type ComponentScopeInput = {
  applicationId?: string | null;
  applicationPartId?: string | null;
  namespace: string;
};
export type ChangeComponentScopeDialogMutation$variables = {
  input: UpdateComponentScopesInput;
};
export type ChangeComponentScopeDialogMutation$data = {
  readonly updateComponentScopes: {
    readonly component: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ComponentsList_componentEdge">;
    } | null;
  };
};
export type ChangeComponentScopeDialogMutation = {
  response: ChangeComponentScopeDialogMutation$data;
  variables: ChangeComponentScopeDialogMutation$variables;
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
    "name": "ChangeComponentScopeDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateComponentScopesPayload",
        "kind": "LinkedField",
        "name": "updateComponentScopes",
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
    "name": "ChangeComponentScopeDialogMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateComponentScopesPayload",
        "kind": "LinkedField",
        "name": "updateComponentScopes",
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
    "cacheID": "4adc196a549660fd2b8d3cef5e9f5db5",
    "id": null,
    "metadata": {},
    "name": "ChangeComponentScopeDialogMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeComponentScopeDialogMutation(\n  $input: UpdateComponentScopesInput!\n) {\n  updateComponentScopes(input: $input) {\n    component {\n      id\n      ...ComponentsList_componentEdge\n    }\n  }\n}\n\nfragment ComponentsList_componentEdge on Component {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "9bf41a49d4b2185120d66662df10a57e";

export default node;
