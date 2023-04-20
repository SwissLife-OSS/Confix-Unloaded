/**
 * @generated SignedSource<<3d68bc20f0e1d7977bddf3a97d04a898>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateComponentValuesInput = {
  id: string;
  values?: any | null;
};
export type UpdateComponentSchemaInput = {
  id: string;
  schema: string;
};
export type EditComponentUpdateMutation$variables = {
  schemaInput: UpdateComponentSchemaInput;
  valuesInput: UpdateComponentValuesInput;
};
export type EditComponentUpdateMutation$data = {
  readonly updateComponentSchema: {
    readonly component: {
      readonly id: string;
      readonly schema: any | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
  readonly updateComponentValues: {
    readonly component: {
      readonly id: string;
      readonly values: any | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type EditComponentUpdateMutation = {
  response: EditComponentUpdateMutation$data;
  variables: EditComponentUpdateMutation$variables;
};

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
v4 = {
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
      "name": "schema",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
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
  "type": "UserError",
  "abstractKey": "__isUserError"
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "valuesInput"
  }
],
v8 = {
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
      "name": "values",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
};
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
        "selections": [
          (v4/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v6/*: any*/)
        ],
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
        "selections": [
          (v4/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5220ffd195b95d3fb848440396dd1947",
    "id": null,
    "metadata": {},
    "name": "EditComponentUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EditComponentUpdateMutation(\n  $valuesInput: UpdateComponentValuesInput!\n  $schemaInput: UpdateComponentSchemaInput!\n) {\n  updateComponentSchema(input: $schemaInput) {\n    component {\n      id\n      schema\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n  updateComponentValues(input: $valuesInput) {\n    component {\n      id\n      values\n    }\n    errors {\n      __typename\n      ... on UserError {\n        __isUserError: __typename\n        message\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd547970175e1b7fe2194e95331f3853";

export default node;
