/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EditApplicationPartVariableOverviewQueryVariables = {
    id: string;
};
export type EditApplicationPartVariableOverviewQueryResponse = {
    readonly applicationPartById: {
        readonly id: string;
        readonly variableValues: ReadonlyArray<{
            readonly id: string;
            readonly environment: {
                readonly id: string;
                readonly name: string;
            } | null;
            readonly variable: {
                readonly id: string;
                readonly name: string;
            } | null;
            readonly value: string;
        }>;
    } | null;
};
export type EditApplicationPartVariableOverviewQuery = {
    readonly response: EditApplicationPartVariableOverviewQueryResponse;
    readonly variables: EditApplicationPartVariableOverviewQueryVariables;
};



/*
query EditApplicationPartVariableOverviewQuery(
  $id: ID!
) {
  applicationPartById(id: $id) {
    id
    variableValues {
      id
      environment {
        id
        name
      }
      variable {
        id
        name
      }
      value
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "ApplicationPart",
    "kind": "LinkedField",
    "name": "applicationPartById",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "VariableValue",
        "kind": "LinkedField",
        "name": "variableValues",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "environment",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Variable",
            "kind": "LinkedField",
            "name": "variable",
            "plural": false,
            "selections": (v2/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplicationPartVariableOverviewQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditApplicationPartVariableOverviewQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "06f89f2c902f272c8bb2f19fda1b9e17",
    "id": null,
    "metadata": {},
    "name": "EditApplicationPartVariableOverviewQuery",
    "operationKind": "query",
    "text": "query EditApplicationPartVariableOverviewQuery(\n  $id: ID!\n) {\n  applicationPartById(id: $id) {\n    id\n    variableValues {\n      id\n      environment {\n        id\n        name\n      }\n      variable {\n        id\n        name\n      }\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c1da72795a383c247aca26758a7f396e';
export default node;
