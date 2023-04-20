/**
 * @generated SignedSource<<0201c9e91ec3ce36b8a8a80f46db0079>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationsListItem$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem_DefaultListItem" | "ApplicationsListItem_SelectedListItem">;
  readonly " $fragmentType": "ApplicationsListItem";
};
export type ApplicationsListItem$key = {
  readonly " $data"?: ApplicationsListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationsListItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationsListItem_DefaultListItem"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationsListItem_SelectedListItem"
    }
  ],
  "type": "Application",
  "abstractKey": null
};

(node as any).hash = "899eafa035555c6c3dda834032bd6989";

export default node;
