/**
 * @generated SignedSource<<d79c6e8a0f6503c642c17e9a0d4e77b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication_ChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
  }>;
  readonly " $fragmentType": "EditApplication_ChangeLog";
};
export type EditApplication_ChangeLog$key = {
  readonly " $data"?: EditApplication_ChangeLog$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_ChangeLog">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplication_ChangeLog",
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
  "type": "Application",
  "abstractKey": null
};

(node as any).hash = "47b3d1ccea143b7989c01791378c8187";

export default node;
