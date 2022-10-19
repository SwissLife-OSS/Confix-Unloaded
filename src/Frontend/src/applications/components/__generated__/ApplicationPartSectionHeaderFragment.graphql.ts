/**
 * @generated SignedSource<<7ddbc4e998e118473e5f44a4abe393ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationPartSectionHeaderFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ApplicationPartSectionHeaderFragment";
};
export type ApplicationPartSectionHeaderFragment$key = {
  readonly " $data"?: ApplicationPartSectionHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartSectionHeaderFragment">;
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

(node as any).hash = "91e1d10bb7bf2936aada64307571fffc";

export default node;
