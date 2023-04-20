/**
 * @generated SignedSource<<816b145eacc1c6a4939a97accd5d3236>>
 * @relayHash 4f5dc330a515619802ac08cdf51cf591
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a5cf781baf041dda7238a52298d5becb7d41470a16f4c45153efe10e65b2b345

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
      readonly name: string;
      readonly scopes: ReadonlyArray<{
        readonly application: {
          readonly id: string;
          readonly name: string;
        } | null;
        readonly applicationId: string | null;
        readonly applicationPart: {
          readonly id: string;
          readonly name: string;
        } | null;
        readonly applicationPartId: string | null;
        readonly namespace: string;
      }>;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ComponentScope",
            "kind": "LinkedField",
            "name": "scopes",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "namespace",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "applicationId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "applicationPartId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "application",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "applicationPart",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              }
            ],
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
    "name": "ChangeComponentScopeDialogMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeComponentScopeDialogMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "id": "a5cf781baf041dda7238a52298d5becb7d41470a16f4c45153efe10e65b2b345",
    "metadata": {},
    "name": "ChangeComponentScopeDialogMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5b2c0b32768d2448a07cd4d7ec415f25";

export default node;
