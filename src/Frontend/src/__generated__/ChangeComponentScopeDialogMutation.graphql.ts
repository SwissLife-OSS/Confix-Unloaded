/**
 * @generated SignedSource<<07475c6c232ff5af82efaacc8b6ea6fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "4f5dc330a515619802ac08cdf51cf591",
    "id": null,
    "metadata": {},
    "name": "ChangeComponentScopeDialogMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeComponentScopeDialogMutation(\n  $input: UpdateComponentScopesInput!\n) {\n  updateComponentScopes(input: $input) {\n    component {\n      id\n      name\n      scopes {\n        namespace\n        applicationId\n        applicationPartId\n        application {\n          id\n          name\n        }\n        applicationPart {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5b2c0b32768d2448a07cd4d7ec415f25";

export default node;
