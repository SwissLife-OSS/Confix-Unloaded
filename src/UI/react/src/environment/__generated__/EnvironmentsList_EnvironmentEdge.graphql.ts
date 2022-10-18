/**
 * @generated SignedSource<<24cd85191b4b47e83c5d369ee8da3c7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EnvironmentsList_EnvironmentEdge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "EnvironmentsList_EnvironmentEdge";
};
export type EnvironmentsList_EnvironmentEdge$key = {
  readonly " $data"?: EnvironmentsList_EnvironmentEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"EnvironmentsList_EnvironmentEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EnvironmentsList_EnvironmentEdge",
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

(node as any).hash = "3e81b41dbdf79c9a9dc6a01be40db8dc";

export default node;
