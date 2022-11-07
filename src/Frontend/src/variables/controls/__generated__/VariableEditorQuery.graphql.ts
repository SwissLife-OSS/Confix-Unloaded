/**
 * @generated SignedSource<<5ca4b0da3ff27281d4e4a5f9ecb282f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type VariableEditorQuery$variables = {
  applicationId?: string | null;
  applicationPartId?: string | null;
  variableId: string;
};
export type VariableEditorQuery$data = {
  readonly variableValues: ReadonlyArray<{
    readonly application: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly applicationPart: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly id: string;
    readonly value: string | null;
    readonly variable: {
      readonly id: string;
      readonly isSecret: boolean;
      readonly name: string;
    } | null;
  }>;
};
export type VariableEditorQuery = {
  response: VariableEditorQuery$data;
  variables: VariableEditorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "applicationId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "applicationPartId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "variableId"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "applicationId",
        "variableName": "applicationId"
      },
      {
        "kind": "Variable",
        "name": "applicationPartId",
        "variableName": "applicationPartId"
      },
      {
        "kind": "Variable",
        "name": "variableId",
        "variableName": "variableId"
      }
    ],
    "concreteType": "VariableValue",
    "kind": "LinkedField",
    "name": "variableValues",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "application",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Variable",
        "kind": "LinkedField",
        "name": "variable",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSecret",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environment",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ApplicationPart",
        "kind": "LinkedField",
        "name": "applicationPart",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VariableEditorQuery",
    "selections": (v6/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "VariableEditorQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "2bbedf50a6e60c2a51178d70a22a8e4e",
    "id": null,
    "metadata": {},
    "name": "VariableEditorQuery",
    "operationKind": "query",
    "text": "query VariableEditorQuery(\n  $variableId: ID!\n  $applicationId: ID\n  $applicationPartId: ID\n) {\n  variableValues(variableId: $variableId, applicationId: $applicationId, applicationPartId: $applicationPartId) {\n    id\n    application {\n      id\n      name\n    }\n    variable {\n      id\n      name\n      isSecret\n    }\n    environment {\n      id\n      name\n    }\n    applicationPart {\n      id\n      name\n    }\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "51bdd991981e37cbafeef1b870868e20";

export default node;
