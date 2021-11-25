/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditComponentQueryVariables = {
    id: string;
};
export type EditComponentQueryResponse = {
    readonly componentById: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EditComponent_component">;
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
    ...EditComponent_component
  }
}

fragment EditComponent_component on Component {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditComponent_component"
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
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "e1ad6c1fe3088775bfb1c6e4439be873",
    "id": null,
    "metadata": {},
    "name": "EditComponentQuery",
    "operationKind": "query",
    "text": "query EditComponentQuery(\n  $id: ID!\n) {\n  componentById(id: $id) {\n    id\n    ...EditComponent_component\n  }\n}\n\nfragment EditComponent_component on Component {\n  id\n  name\n  state\n  schemaSdl\n  schema\n  values\n  defaults\n  schemaViolations {\n    path\n    code\n  }\n}\n"
  }
};
})();
(node as any).hash = '4a0682daed6620a0d989fc38adb76a00';
export default node;
