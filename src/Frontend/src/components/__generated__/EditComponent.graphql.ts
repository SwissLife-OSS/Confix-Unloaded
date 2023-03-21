/**
 * @generated SignedSource<<7c3585055b0963b2fe5560a428575e02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditComponent$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_AvailableIn" | "EditComponent_ComponentChangeLog" | "EditComponent_EditComponentForm">;
  readonly " $fragmentType": "EditComponent";
};
export type EditComponent$key = {
  readonly " $data"?: EditComponent$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditComponent",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditComponent_AvailableIn"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditComponent_EditComponentForm"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditComponent_ComponentChangeLog"
    }
  ],
  "type": "Component",
  "abstractKey": null
};

(node as any).hash = "cc20c66bb8c4cd62cf5337c937d60d8c";

export default node;
