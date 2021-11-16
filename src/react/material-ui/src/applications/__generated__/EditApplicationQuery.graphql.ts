/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EditApplicationQueryVariables = {
    id: string;
};
export type EditApplicationQueryResponse = {
    readonly applicationById: {
        readonly id: string;
        readonly name: string;
        readonly namespace: string | null;
    } | null;
};
export type EditApplicationQuery = {
    readonly response: EditApplicationQueryResponse;
    readonly variables: EditApplicationQueryVariables;
};



/*
query EditApplicationQuery(
  $id: ID!
) {
  applicationById(id: $id) {
    id
    name
    namespace
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
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Application",
    "kind": "LinkedField",
    "name": "applicationById",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "namespace",
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
    "name": "EditApplicationQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditApplicationQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4d4225bad0e0092826087d09829847d2",
    "id": null,
    "metadata": {},
    "name": "EditApplicationQuery",
    "operationKind": "query",
    "text": "query EditApplicationQuery(\n  $id: ID!\n) {\n  applicationById(id: $id) {\n    id\n    name\n    namespace\n  }\n}\n"
  }
};
})();
(node as any).hash = 'da1ccd94b023a3dfe1b1cc1edd33ea41';
export default node;
