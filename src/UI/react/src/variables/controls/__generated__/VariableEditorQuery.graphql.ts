/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type VariableEditorQueryVariables = {
    variableId: string;
    applicationId: string;
    applicationPartId: string;
};
export type VariableEditorQueryResponse = {
    readonly variableValuesOfApplicationPart: ReadonlyArray<{
        readonly id: string;
        readonly application: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly variable: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly environment: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly applicationPart: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly value: string;
    }>;
};
export type VariableEditorQuery = {
    readonly response: VariableEditorQueryResponse;
    readonly variables: VariableEditorQueryVariables;
};



/*
query VariableEditorQuery(
  $variableId: ID!
  $applicationId: ID!
  $applicationPartId: ID!
) {
  variableValuesOfApplicationPart(variableId: $variableId, applicationId: $applicationId, applicationPartId: $applicationPartId) {
    id
    application {
      id
      name
    }
    variable {
      id
      name
    }
    environment {
      id
      name
    }
    applicationPart {
      id
      name
    }
    value
  }
}
*/

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
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v5 = [
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
    "name": "variableValuesOfApplicationPart",
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
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Variable",
        "kind": "LinkedField",
        "name": "variable",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environment",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ApplicationPart",
        "kind": "LinkedField",
        "name": "applicationPart",
        "plural": false,
        "selections": (v4/*: any*/),
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
    "selections": (v5/*: any*/),
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
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "a21b8f7853b669e3f3b8f277c9c06709",
    "id": null,
    "metadata": {},
    "name": "VariableEditorQuery",
    "operationKind": "query",
    "text": "query VariableEditorQuery(\n  $variableId: ID!\n  $applicationId: ID!\n  $applicationPartId: ID!\n) {\n  variableValuesOfApplicationPart(variableId: $variableId, applicationId: $applicationId, applicationPartId: $applicationPartId) {\n    id\n    application {\n      id\n      name\n    }\n    variable {\n      id\n      name\n    }\n    environment {\n      id\n      name\n    }\n    applicationPart {\n      id\n      name\n    }\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '12f30d1028cfd4fd562fe0027f711aa9';
export default node;
