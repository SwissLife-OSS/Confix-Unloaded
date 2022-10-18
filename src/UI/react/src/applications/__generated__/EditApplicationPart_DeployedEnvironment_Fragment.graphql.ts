/**
 * @generated SignedSource<<04def5d31e1b032d27f26da11ea151ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_DeployedEnvironment_Fragment$data = {
  readonly deployments: {
    readonly nodes: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"DeployedEnvironmentsOverviewFragment">;
    }> | null;
  } | null;
  readonly " $fragmentType": "EditApplicationPart_DeployedEnvironment_Fragment";
};
export type EditApplicationPart_DeployedEnvironment_Fragment$key = {
  readonly " $data"?: EditApplicationPart_DeployedEnvironment_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart_DeployedEnvironment_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPart_DeployedEnvironment_Fragment",
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
              "name": "DeployedEnvironmentsOverviewFragment"
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

(node as any).hash = "648c53e289b5a2dd51346775d16ea9f8";

export default node;
