/**
 * @generated SignedSource<<87514d15e4e502a783de36efa782be2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeployedEnvironmentsOverviewFragment$data = ReadonlyArray<{
  readonly claimedVersions: {
    readonly nodes: ReadonlyArray<{
      readonly application: {
        readonly name: string;
      } | null;
      readonly applicationPart: {
        readonly name: string;
      } | null;
      readonly environment: {
        readonly name: string;
      } | null;
      readonly publishedApplicationPart: {
        readonly id: string;
        readonly publishedAt: any;
        readonly version: number;
      } | null;
      readonly tag: string;
    }> | null;
  } | null;
  readonly environment: {
    readonly id: string;
    readonly name: string;
    readonly parent: {
      readonly id: string;
      readonly name: string;
    } | null;
  } | null;
  readonly " $fragmentType": "DeployedEnvironmentsOverviewFragment";
}>;
export type DeployedEnvironmentsOverviewFragment$key = ReadonlyArray<{
  readonly " $data"?: DeployedEnvironmentsOverviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeployedEnvironmentsOverviewFragment">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "DeployedEnvironmentsOverviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environment",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Environment",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClaimedVersionsConnection",
      "kind": "LinkedField",
      "name": "claimedVersions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClaimedVersion",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "tag",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Application",
              "kind": "LinkedField",
              "name": "application",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ApplicationPart",
              "kind": "LinkedField",
              "name": "applicationPart",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PublishedApplicationPart",
              "kind": "LinkedField",
              "name": "publishedApplicationPart",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
                  "kind": "ScalarField",
                  "name": "publishedAt",
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
              "selections": (v2/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "DeployedEnvironment",
  "abstractKey": null
};
})();

(node as any).hash = "0c292b0670c7bdb94fec8026a157517e";

export default node;
