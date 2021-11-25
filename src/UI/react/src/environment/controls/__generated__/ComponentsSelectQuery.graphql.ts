/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type EnvironmentFilterInput = {
    and?: Array<EnvironmentFilterInput> | null | undefined;
    or?: Array<EnvironmentFilterInput> | null | undefined;
    name?: StringOperationFilterInput | null | undefined;
};
export type StringOperationFilterInput = {
    and?: Array<StringOperationFilterInput> | null | undefined;
    or?: Array<StringOperationFilterInput> | null | undefined;
    eq?: string | null | undefined;
    neq?: string | null | undefined;
    contains?: string | null | undefined;
    ncontains?: string | null | undefined;
    in?: Array<string | null> | null | undefined;
    nin?: Array<string | null> | null | undefined;
    startsWith?: string | null | undefined;
    nstartsWith?: string | null | undefined;
    endsWith?: string | null | undefined;
    nendsWith?: string | null | undefined;
};
export type EnvironmentsSelectQueryVariables = {
    where?: EnvironmentFilterInput | null | undefined;
};
export type EnvironmentsSelectQueryResponse = {
    readonly Environments: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            };
        }> | null;
    } | null;
};
export type EnvironmentsSelectQuery = {
    readonly response: EnvironmentsSelectQueryResponse;
    readonly variables: EnvironmentsSelectQueryVariables;
};



/*
query EnvironmentsSelectQuery(
  $where: EnvironmentFilterInput
) {
  Environments(where: $where) {
    edges {
      node {
        id
        name
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "where",
        "variableName": "where"
      }
    ],
    "concreteType": "EnvironmentsConnection",
    "kind": "LinkedField",
    "name": "Environments",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EnvironmentsEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Environment",
            "kind": "LinkedField",
            "name": "node",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EnvironmentsSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EnvironmentsSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1b05e6a55bb62a174861720deb80b892",
    "id": null,
    "metadata": {},
    "name": "EnvironmentsSelectQuery",
    "operationKind": "query",
    "text": "query EnvironmentsSelectQuery(\n  $where: EnvironmentFilterInput\n) {\n  Environments(where: $where) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e508c4a8a83d3e985121e888459f528f';
export default node;
