/**
 * @generated SignedSource<<9d3b2b3e1b5c6615cec7c57243da3cbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartComponent_ApplicationPartComponentChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
  }>;
  readonly " $fragmentType": "EditApplicationPartComponent_ApplicationPartComponentChangeLog";
};
export type EditApplicationPartComponent_ApplicationPartComponentChangeLog$key = {
  readonly " $data"?: EditApplicationPartComponent_ApplicationPartComponentChangeLog$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_ApplicationPartComponentChangeLog">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPartComponent_ApplicationPartComponentChangeLog",
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

(node as any).hash = "ff4c0ca925e82574867faf215c3f86b5";

export default node;
