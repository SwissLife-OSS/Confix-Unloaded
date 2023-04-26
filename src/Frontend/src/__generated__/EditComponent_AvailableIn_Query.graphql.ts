/**
 * @generated SignedSource<<cea47e08db498c6d2d8f200e54bc411d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditComponent_AvailableIn_Query$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChangeComponentScopeDialog">;
  readonly " $fragmentType": "EditComponent_AvailableIn_Query";
};
export type EditComponent_AvailableIn_Query$key = {
  readonly " $data"?: EditComponent_AvailableIn_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_AvailableIn_Query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditComponent_AvailableIn_Query",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeComponentScopeDialog"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9e590bf0a8efde8260310708564162dc";

export default node;
