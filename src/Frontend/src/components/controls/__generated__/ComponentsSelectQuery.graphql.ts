/**
 * @generated SignedSource<<6c6cf294359df6c7805264b880746a53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ComponentFilterInput = {
  and?: ReadonlyArray<ComponentFilterInput> | null;
  name?: StringOperationFilterInput | null;
  or?: ReadonlyArray<ComponentFilterInput> | null;
};
export type StringOperationFilterInput = {
  and?: ReadonlyArray<StringOperationFilterInput> | null;
  contains?: string | null;
  endsWith?: string | null;
  eq?: string | null;
  in?: ReadonlyArray<string | null> | null;
  ncontains?: string | null;
  nendsWith?: string | null;
  neq?: string | null;
  nin?: ReadonlyArray<string | null> | null;
  nstartsWith?: string | null;
  or?: ReadonlyArray<StringOperationFilterInput> | null;
  startsWith?: string | null;
};
export type ComponentsSelectQuery$variables = {
  where?: ComponentFilterInput | null;
};
export type ComponentsSelectQuery$data = {
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
  response: ComponentsSelectQuery$data;
  variables: ComponentsSelectQuery$variables;
};

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

(node as any).hash = "e508c4a8a83d3e985121e888459f528f";

export default node;
