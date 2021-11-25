/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditEnvironment_Environment = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "EditEnvironment_Environment";
};
export type EditEnvironment_Environment$data = EditEnvironment_Environment;
export type EditEnvironment_Environment$key = {
    readonly " $data"?: EditEnvironment_Environment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditEnvironment_Environment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditEnvironment_Environment",
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
  "type": "Environment",
  "abstractKey": null
};
(node as any).hash = '5c0155ca9b8f009389f09cf105a88ca9';
export default node;
