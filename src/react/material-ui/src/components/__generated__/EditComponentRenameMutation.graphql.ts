/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
export type RenameComponentInput = {
    id: unknown;
    name: string;
};
export type EditComponentRenameMutationVariables = {
    input: RenameComponentInput;
};
export type EditComponentRenameMutationResponse = {
    readonly renameComponent: {
        readonly component: {
            readonly id: string;
            readonly name: string;
            readonly state: ComponentState;
            readonly schemaSdl: unknown | null;
            readonly schema: unknown | null;
            readonly values: unknown | null;
            readonly defaults: unknown | null;
            readonly schemaViolations: ReadonlyArray<{
                readonly path: unknown;
                readonly code: string;
            }>;
        };
    };
};
export type EditComponentRenameMutation = {
    readonly response: EditComponentRenameMutationResponse;
    readonly variables: EditComponentRenameMutationVariables;
};



/*
mutation EditComponentRenameMutation(
  $input: RenameComponentInput!
) {
  renameComponent(input: $input) {
    component {
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
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RenameComponentPayload",
    "kind": "LinkedField",
    "name": "renameComponent",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "component",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentRenameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditComponentRenameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ccce46dd53ff0534ca18bfaf08b9e964",
    "id": null,
    "metadata": {},
    "name": "EditComponentRenameMutation",
    "operationKind": "mutation",
    "text": "mutation EditComponentRenameMutation(\n  $input: RenameComponentInput!\n) {\n  renameComponent(input: $input) {\n    component {\n      id\n      name\n      state\n      schemaSdl\n      schema\n      values\n      defaults\n      schemaViolations {\n        path\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9e9446c27cdfdb37e12b6fa59a9a8945';
export default node;
