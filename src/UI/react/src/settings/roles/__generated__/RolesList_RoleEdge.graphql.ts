/**
 * @generated SignedSource<<84e6aff5fa019d8b169b404b229c4ca6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RolesList_RoleEdge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "RolesList_RoleEdge";
};
export type RolesList_RoleEdge$key = {
  readonly " $data"?: RolesList_RoleEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"RolesList_RoleEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RolesList_RoleEdge",
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
  "type": "Role",
  "abstractKey": null
};

(node as any).hash = "40d6b3894f16713699d64a90641a51f4";

export default node;
