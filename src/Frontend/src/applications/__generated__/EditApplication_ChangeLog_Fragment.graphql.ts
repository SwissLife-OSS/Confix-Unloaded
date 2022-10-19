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
export type EditApplication_ChangeLog_Fragment$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_fragment">;
  }>;
  readonly " $fragmentType": "EditApplication_ChangeLog_Fragment";
};
export type EditApplication_ChangeLog_Fragment$key = {
  readonly " $data"?: EditApplication_ChangeLog_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_ChangeLog_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplication_ChangeLog_Fragment",
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
          "name": "ChangeLog_fragment"
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
