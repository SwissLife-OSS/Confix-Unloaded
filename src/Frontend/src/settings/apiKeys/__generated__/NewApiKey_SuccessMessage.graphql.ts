/**
 * @generated SignedSource<<9f09142132a1a4cd791250b9539e6bda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewApiKey_SuccessMessage$data = {
  readonly secret: string;
  readonly " $fragmentType": "NewApiKey_SuccessMessage";
};
export type NewApiKey_SuccessMessage$key = {
  readonly " $data"?: NewApiKey_SuccessMessage$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewApiKey_SuccessMessage">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewApiKey_SuccessMessage",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "secret",
      "storageKey": null
    }
  ],
  "type": "ApiKeyWithSecret",
  "abstractKey": null
};

(node as any).hash = "a8ab689a63472e69315799c305ae3431";

export default node;
