/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_DeployedEnvironment_Fragment = {
    readonly deployments: {
        readonly nodes: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"DeployedEnvironmentsOverviewFragment">;
        }> | null;
    } | null;
    readonly " $refType": "EditApplicationPart_DeployedEnvironment_Fragment";
};
export type EditApplicationPart_DeployedEnvironment_Fragment$data = EditApplicationPart_DeployedEnvironment_Fragment;
export type EditApplicationPart_DeployedEnvironment_Fragment$key = {
    readonly " $data"?: EditApplicationPart_DeployedEnvironment_Fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_DeployedEnvironment_Fragment">;
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
(node as any).hash = '648c53e289b5a2dd51346775d16ea9f8';
export default node;
