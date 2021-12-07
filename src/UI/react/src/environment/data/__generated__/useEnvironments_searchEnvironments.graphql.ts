/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import useEnvironmentsPaginationQuery from "./useEnvironmentsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type useEnvironments_searchEnvironments = {
    readonly searchEnvironments: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
            };
        }> | null;
    } | null;
    readonly " $refType": "useEnvironments_searchEnvironments";
};
export type useEnvironments_searchEnvironments$data = useEnvironments_searchEnvironments;
export type useEnvironments_searchEnvironments$key = {
    readonly " $data"?: useEnvironments_searchEnvironments$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useEnvironments_searchEnvironments">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "searchEnvironments"
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
      "operation": useEnvironmentsPaginationQuery
    }
  },
  "name": "useEnvironments_searchEnvironments",
  "selections": [
    {
      "alias": "searchEnvironments",
      "args": null,
      "concreteType": "SearchEnvironmentsConnection",
      "kind": "LinkedField",
      "name": "__useEnvironments_searchEnvironments_connection",
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
(node as any).hash = '919293b06c3e60921850070d82637bb1';
export default node;
