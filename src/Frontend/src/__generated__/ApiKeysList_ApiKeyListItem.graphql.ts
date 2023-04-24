/**
 * @generated SignedSource<<2162a073efc7572b17dd114acfa0e8a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiKeysList_ApiKeyListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ApiKeysList_ApiKeyListItem";
};
export type ApiKeysList_ApiKeyListItem$key = {
  readonly " $data"?: ApiKeysList_ApiKeyListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApiKeysList_ApiKeyListItem">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApiKeysList_ApiKeyListItem",
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

(node as any).hash = "628b43f6842605c10593c234354173f6";

export default node;
