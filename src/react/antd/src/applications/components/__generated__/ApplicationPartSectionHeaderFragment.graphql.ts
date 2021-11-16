/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ApplicationPartSectionHeaderFragment = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "ApplicationPartSectionHeaderFragment";
};
export type ApplicationPartSectionHeaderFragment$data = ApplicationPartSectionHeaderFragment;
export type ApplicationPartSectionHeaderFragment$key = {
    readonly " $data"?: ApplicationPartSectionHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ApplicationPartSectionHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationPartSectionHeaderFragment",
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
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = '91e1d10bb7bf2936aada64307571fffc';
export default node;
