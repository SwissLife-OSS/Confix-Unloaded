/**
 * @generated SignedSource<<d9c6ae9a2073690c0a2b57acdbd7b6fe>>
 * @relayHash 37064fc35fe43476b5521645fd849eb8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a6c774262ecf9707938a1f70f338fca8cfdeef02fad0f39f34497695dad8fa8c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariableEditorQuery$variables = {
  applicationId?: string | null;
  applicationPartId?: string | null;
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
    readonly value: string | null;
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
  "name": "applicationId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "applicationPartId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "variableId"
},
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "applicationId",
      "variableName": "applicationId"
    },
    {
      "kind": "Variable",
      "name": "applicationPartId",
      "variableName": "applicationPartId"
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
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": (v5/*: any*/),
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
        (v3/*: any*/),
        (v4/*: any*/),
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
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "applicationPart",
      "plural": false,
      "selections": (v5/*: any*/),
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
v7 = [
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VariableEditorQuery",
    "selections": [
      (v6/*: any*/),
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "VariableEditorQuery",
    "selections": [
      (v6/*: any*/),
      {
        "alias": null,
        "args": (v7/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/),
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
        "args": (v7/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "VariableEditor_useEnvironments_searchEnvironments",
        "kind": "LinkedHandle",
        "name": "searchEnvironments"
      }
    ]
  },
  "params": {
    "id": "a6c774262ecf9707938a1f70f338fca8cfdeef02fad0f39f34497695dad8fa8c",
    "metadata": {},
    "name": "VariableEditorQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0f6bc61bc06dd3a6d86bb456112ee7b3";

export default node;
