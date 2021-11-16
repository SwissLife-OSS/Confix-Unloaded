/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ComponentFilterInput = {
    and?: Array<ComponentFilterInput> | null | undefined;
    or?: Array<ComponentFilterInput> | null | undefined;
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
export type ComponentsSelectQueryVariables = {
    where?: ComponentFilterInput | null | undefined;
};
export type ComponentsSelectQueryResponse = {
    readonly components: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            };
        }> | null;
    } | null;
};
export type ComponentsSelectQuery = {
    readonly response: ComponentsSelectQueryResponse;
    readonly variables: ComponentsSelectQueryVariables;
};



/*
query ComponentsSelectQuery(
  $where: ComponentFilterInput
) {
  components(where: $where) {
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
    "concreteType": "ComponentsConnection",
    "kind": "LinkedField",
    "name": "components",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ComponentsEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Component",
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
    "name": "ComponentsSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComponentsSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1b05e6a55bb62a174861720deb80b892",
    "id": null,
    "metadata": {},
    "name": "ComponentsSelectQuery",
    "operationKind": "query",
    "text": "query ComponentsSelectQuery(\n  $where: ComponentFilterInput\n) {\n  components(where: $where) {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e508c4a8a83d3e985121e888459f528f';
export default node;
