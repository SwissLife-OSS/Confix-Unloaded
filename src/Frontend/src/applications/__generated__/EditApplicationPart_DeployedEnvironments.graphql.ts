/**
 * @generated SignedSource<<ddc01f1c628ca9103eeb1391db7c78b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_DeployedEnvironments$data = {
  readonly deployments: {
    readonly nodes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"DeployedEnvironmentsOverview">;
    }> | null;
  } | null;
  readonly " $fragmentType": "EditApplicationPart_DeployedEnvironments";
};
export type EditApplicationPart_DeployedEnvironments$key = {
  readonly " $data"?: EditApplicationPart_DeployedEnvironments$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart_DeployedEnvironments">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPart_DeployedEnvironments",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DeploymentsConnection",
      "kind": "LinkedField",
      "name": "deployments",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DeployedEnvironment",
          "kind": "LinkedField",
          "name": "nodes",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DeployedEnvironmentsOverview"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};

(node as any).hash = "9a360546765e72ebf3a208898e15c294";

export default node;
