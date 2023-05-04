/**
 * @generated SignedSource<<ec444527a0813e2ae7f1de46fe28c368>>
 * @relayHash 98745994726d6f51dc7bd8656f7314a6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 98745994726d6f51dc7bd8656f7314a6

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariableValueScopeInput = {
  application?: ApplicationVariableValueScopeInput | null;
  applicationPart?: ApplicationPartVariableValueScopeInput | null;
  namespace?: NamespaceVariableValueScopeInput | null;
};
export type ApplicationVariableValueScopeInput = {
  applicationId: string;
  environmentId?: string | null;
};
export type ApplicationPartVariableValueScopeInput = {
  environmentId?: string | null;
  partId: string;
};
export type NamespaceVariableValueScopeInput = {
  environmentId?: string | null;
  namespace: string;
};
export type VariableEditorQuery$variables = {
  scope: VariableValueScopeInput;
  variableId: string;
};
export type VariableEditorQuery$data = {
  readonly variableValues: ReadonlyArray<{
    readonly application: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly applicationPart: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly id: string;
    readonly value: string;
    readonly variable: {
      readonly id: string;
      readonly isSecret: boolean;
      readonly name: string;
    } | null;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"VariableEditor_useEnvironments">;
};
export type VariableEditorQuery = {
  response: VariableEditorQuery$data;
  variables: VariableEditorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "scope"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "variableId"
},
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
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "scope",
      "variableName": "scope"
    },
    {
      "kind": "Variable",
      "name": "variableId",
      "variableName": "variableId"
    }
  ],
  "concreteType": "VariableValue",
  "kind": "LinkedField",
  "name": "variableValues",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isSecret",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environment",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "applicationPart",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
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
    "name": "VariableEditorQuery",
    "selections": [
      (v5/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "VariableEditor_useEnvironments"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "VariableEditorQuery",
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "SearchEnvironmentsConnection",
        "kind": "LinkedField",
        "name": "searchEnvironments",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchEnvironmentsEdge",
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "searchEnvironments(first:50)"
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "VariableEditor_useEnvironments_searchEnvironments",
        "kind": "LinkedHandle",
        "name": "searchEnvironments"
      }
    ]
  },
  "params": {
    "id": "98745994726d6f51dc7bd8656f7314a6",
    "metadata": {},
    "name": "VariableEditorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "66aac1a6c70a4a6a2fe2261f795b4592";

export default node;
