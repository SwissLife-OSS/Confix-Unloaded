/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
export type EditComponentQueryVariables = {
    id: string;
};
export type EditComponentQueryResponse = {
    readonly componentById: {
        readonly id: string;
        readonly name: string;
        readonly state: ComponentState;
        readonly schemaSdl: string | null;
        readonly schema: object | null;
        readonly values: object | null;
        readonly defaults: object | null;
        readonly schemaViolations: ReadonlyArray<{
            readonly path: object;
            readonly code: string;
        }>;
    } | null;
};
export type EditComponentQuery = {
    readonly response: EditComponentQueryResponse;
    readonly variables: EditComponentQueryVariables;
};



/*
query EditComponentQuery(
  $id: ID!
) {
  componentById(id: $id) {
    id
    name
    state
    schemaSdl
    schema
    values
    defaults
    schemaViolations {
      path
      code
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
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "componentById",
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
        "name": "state",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "schemaSdl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "schema",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "values",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "defaults",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "SchemaViolation",
        "kind": "LinkedField",
        "name": "schemaViolations",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "path",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
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
    "name": "EditComponentQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditComponentQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9de35da369121498991af14c4884c1c0",
    "id": null,
    "metadata": {},
    "name": "EditComponentQuery",
    "operationKind": "query",
    "text": "query EditComponentQuery(\n  $id: ID!\n) {\n  componentById(id: $id) {\n    id\n    name\n    state\n    schemaSdl\n    schema\n    values\n    defaults\n    schemaViolations {\n      path\n      code\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5114ec88ac0da7cfc7cc91284aebb5f1';
export default node;
