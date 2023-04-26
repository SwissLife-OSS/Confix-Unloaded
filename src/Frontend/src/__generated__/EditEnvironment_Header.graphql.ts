/**
 * @generated SignedSource<<f401c6529cbb908b0a6282e2f68870ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditEnvironment_Header$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "EditEnvironment_Header";
};
export type EditEnvironment_Header$key = {
  readonly " $data"?: EditEnvironment_Header$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_Header">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditEnvironment_Header",
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

(node as any).hash = "2b6c807a9fc44ef40a55a4badabb70c0";

export default node;
