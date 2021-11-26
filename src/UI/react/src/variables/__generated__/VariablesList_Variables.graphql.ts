/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import VariablesListPaginationQuery from "./VariablesListPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type VariablesList_Variables = {
    readonly searchVariables: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly " $fragmentRefs": FragmentRefs<"VariablesList_VariableEdge">;
            };
        }> | null;
    } | null;
    readonly " $refType": "VariablesList_Variables";
};
export type VariablesList_Variables$data = VariablesList_Variables;
export type VariablesList_Variables$key = {
    readonly " $data"?: VariablesList_Variables$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"VariablesList_Variables">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "searchVariables"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "count"
    },
    {
      "kind": "RootArgument",
      "name": "cursor"
    },
    {
      "kind": "RootArgument",
      "name": "search"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": VariablesListPaginationQuery
    }
  },
  "name": "VariablesList_Variables",
  "selections": [
    {
      "alias": "searchVariables",
      "args": [
        {
          "kind": "Variable",
          "name": "search",
          "variableName": "search"
        }
      ],
      "concreteType": "SearchVariablesConnection",
      "kind": "LinkedField",
      "name": "__Query_searchVariables_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "SearchVariablesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Variable",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "VariablesList_VariableEdge"
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();
(node as any).hash = 'b2f8df3c3361e91c95ebef4f6d606cf6';
export default node;
