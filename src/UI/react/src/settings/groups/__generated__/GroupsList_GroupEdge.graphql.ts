/**
 * @generated SignedSource<<62c9423fec4820e61e1e485946a88758>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GroupsList_GroupEdge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "GroupsList_GroupEdge";
};
export type GroupsList_GroupEdge$key = {
  readonly " $data"?: GroupsList_GroupEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"GroupsList_GroupEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GroupsList_GroupEdge",
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

(node as any).hash = "247ea4c842682115017143cd66713dd0";

export default node;
