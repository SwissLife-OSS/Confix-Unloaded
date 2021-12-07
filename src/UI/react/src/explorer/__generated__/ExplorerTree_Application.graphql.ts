/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExplorerTree_Application = {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentRefs": FragmentRefs<"ExplorerTree_ApplicationDetails">;
    readonly " $refType": "ExplorerTree_Application";
};
export type ExplorerTree_Application$data = ExplorerTree_Application;
export type ExplorerTree_Application$key = {
    readonly " $data"?: ExplorerTree_Application$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ExplorerTree_Application">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExplorerTree_Application",
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
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ExplorerTree_ApplicationDetails"
        }
      ]
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = 'ab3bb66e6d747d565ea9e884d68db513';
export default node;
