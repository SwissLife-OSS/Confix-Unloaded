/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditEnvironmentQueryVariables = {
    id: string;
};
export type EditEnvironmentQueryResponse = {
    readonly environmentById: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EditEnvironment_Environment">;
    } | null;
};
export type EditEnvironmentQuery = {
    readonly response: EditEnvironmentQueryResponse;
    readonly variables: EditEnvironmentQueryVariables;
};



/*
query EditEnvironmentQuery(
  $id: ID!
) {
  environmentById(id: $id) {
    id
    ...EditEnvironment_Environment
  }
}

fragment EditEnvironment_Environment on Environment {
  id
  name
  parent {
    id
    name
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditEnvironmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environmentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditEnvironment_Environment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditEnvironmentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Environment",
        "kind": "LinkedField",
        "name": "environmentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "parent",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0423a419f545768e873201cf6acd2c22",
    "id": null,
    "metadata": {},
    "name": "EditEnvironmentQuery",
    "operationKind": "query",
    "text": "query EditEnvironmentQuery(\n  $id: ID!\n) {\n  environmentById(id: $id) {\n    id\n    ...EditEnvironment_Environment\n  }\n}\n\nfragment EditEnvironment_Environment on Environment {\n  id\n  name\n  parent {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bb3096ceb0cc7df8ddc858950ae65621';
export default node;
