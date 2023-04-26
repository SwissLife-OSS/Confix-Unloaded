/**
 * @generated SignedSource<<a6b99d8ef5e458cfe117a245b7e75151>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupsList_ListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "GroupsList_ListItem";
};
export type GroupsList_ListItem$key = {
  readonly " $data"?: GroupsList_ListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupsList_ListItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupsList_ListItem",
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
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "23bae6b0491f73f94afede71bc02bf34";

export default node;
