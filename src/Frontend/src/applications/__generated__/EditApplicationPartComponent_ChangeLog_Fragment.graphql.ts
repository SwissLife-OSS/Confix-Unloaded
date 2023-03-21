/**
 * @generated SignedSource<<c6ae52610ad3bcab0d2dc2a9cdbc2de2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartComponent_ChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
  }>;
  readonly " $fragmentType": "EditApplicationPartComponent_ChangeLog";
};
export type EditApplicationPartComponent_ChangeLog$key = {
  readonly " $data"?: EditApplicationPartComponent_ChangeLog$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_ChangeLog">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPartComponent_ChangeLog",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ChangeLog",
      "kind": "LinkedField",
      "name": "changeLog",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPartComponent",
  "abstractKey": null
};

(node as any).hash = "d4f9ab880bda698f515b8aa45e5f3675";

export default node;
