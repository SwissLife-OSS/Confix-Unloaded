/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import PublishedApplicationPartsPaginationQuery from "./PublishedApplicationPartsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type PublishedApplicationPartsFragment = {
    readonly publishedVersions: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly publishedAt: Date;
                readonly part: {
                    readonly name: string;
                };
                readonly publishedBy: {
                    readonly email: string | null;
                };
                readonly version: number;
                readonly claimsVersions: ReadonlyArray<{
                    readonly gitVersion: string;
                    readonly environment: {
                        readonly name: string;
                    } | null;
                }>;
            };
        }> | null;
    } | null;
    readonly id: string;
    readonly " $refType": "PublishedApplicationPartsFragment";
};
export type PublishedApplicationPartsFragment$data = PublishedApplicationPartsFragment;
export type PublishedApplicationPartsFragment$key = {
    readonly " $data"?: PublishedApplicationPartsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PublishedApplicationPartsFragment">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "publishedVersions"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": PublishedApplicationPartsPaginationQuery,
      "identifierField": "id"
    }
  },
  "name": "PublishedApplicationPartsFragment",
  "selections": [
    {
      "alias": "publishedVersions",
      "args": null,
      "concreteType": "PublishedVersionsConnection",
      "kind": "LinkedField",
      "name": "__part_publishedVersions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PublishedVersionsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "PublishedApplicationPart",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "publishedAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ApplicationPart",
                  "kind": "LinkedField",
                  "name": "part",
                  "plural": false,
                  "selections": (v2/*: any*/),
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "UserInfo",
                  "kind": "LinkedField",
                  "name": "publishedBy",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "email",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "version",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ClaimedVersion",
                  "kind": "LinkedField",
                  "name": "claimsVersions",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "gitVersion",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Environment",
                      "kind": "LinkedField",
                      "name": "environment",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": null
                    }
                  ],
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
    },
    (v1/*: any*/)
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();
(node as any).hash = 'caedcb107c67258ae33719f146bc9daf';
export default node;
