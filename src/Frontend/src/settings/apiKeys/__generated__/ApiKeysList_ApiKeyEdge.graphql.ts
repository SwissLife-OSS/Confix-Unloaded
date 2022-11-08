/**
 * @generated SignedSource<<5573f4dbceb197724e0768a14a547869>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiKeysList_ApiKeyEdge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ApiKeysList_ApiKeyEdge";
};
export type ApiKeysList_ApiKeyEdge$key = {
  readonly " $data"?: ApiKeysList_ApiKeyEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApiKeysList_ApiKeyEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApiKeysList_ApiKeyEdge",
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
  "type": "ApiKey",
  "abstractKey": null
};

(node as any).hash = "6a852c15f97578bc602d27b49495781f";

export default node;
