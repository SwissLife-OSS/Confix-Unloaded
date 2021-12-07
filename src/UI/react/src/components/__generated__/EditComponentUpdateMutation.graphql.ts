/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type UpdateComponentValuesInput = {
    id: string;
    values?: object | null | undefined;
};
export type UpdateComponentSchemaInput = {
    id: string;
    schema: string;
};
export type EditComponentUpdateMutationVariables = {
    valuesInput: UpdateComponentValuesInput;
    schemaInput: UpdateComponentSchemaInput;
};
export type EditComponentUpdateMutationResponse = {
    readonly updateComponentSchema: {
        readonly component: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EditComponent_component">;
        };
    };
    readonly updateComponentValues: {
        readonly component: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"EditComponent_component">;
        } | null;
    };
};
export type EditComponentUpdateMutation = {
    readonly response: EditComponentUpdateMutationResponse;
    readonly variables: EditComponentUpdateMutationVariables;
};



/*
mutation EditComponentUpdateMutation(
  $valuesInput: UpdateComponentValuesInput!
  $schemaInput: UpdateComponentSchemaInput!
) {
  updateComponentSchema(input: $schemaInput) {
    component {
      id
      ...EditComponent_component
    }
  }
  updateComponentValues(input: $valuesInput) {
    component {
      id
      ...EditComponent_component
    }
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "schemaInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "valuesInput"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "schemaInput"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EditComponent_component"
      }
    ],
    "storageKey": null
  }
],
v5 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "valuesInput"
  }
],
v6 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": [
      (v3/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateComponentSchemaPayload",
        "kind": "LinkedField",
        "name": "updateComponentSchema",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditComponentUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateComponentSchemaPayload",
        "kind": "LinkedField",
        "name": "updateComponentSchema",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ed8828ed0063575cf72513c27b971898",
    "id": null,
    "metadata": {},
    "name": "EditComponentUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EditComponentUpdateMutation(\n  $valuesInput: UpdateComponentValuesInput!\n  $schemaInput: UpdateComponentSchemaInput!\n) {\n  updateComponentSchema(input: $schemaInput) {\n    component {\n      id\n      ...EditComponent_component\n    }\n  }\n  updateComponentValues(input: $valuesInput) {\n    component {\n      id\n      ...EditComponent_component\n    }\n  }\n}\n\nfragment EditComponent_component on Component {\n  id\n  name\n  state\n  schemaSdl\n  schema\n  values\n  defaults\n  schemaViolations {\n    path\n    code\n  }\n}\n"
  }
};
})();
(node as any).hash = 'edc934f8a1970a9724d8f8e9e206716f';
export default node;
