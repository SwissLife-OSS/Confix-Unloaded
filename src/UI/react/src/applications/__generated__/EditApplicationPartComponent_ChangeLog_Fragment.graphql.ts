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
export type EditApplicationPartComponent_ChangeLog_Fragment$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_fragment">;
  }>;
  readonly " $fragmentType": "EditApplicationPartComponent_ChangeLog_Fragment";
};
export type EditApplicationPartComponent_ChangeLog_Fragment$key = {
  readonly " $data"?: EditApplicationPartComponent_ChangeLog_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_ChangeLog_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPartComponent_ChangeLog_Fragment",
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
  "type": "ApplicationPartComponent",
  "abstractKey": null
};

(node as any).hash = "d4f9ab880bda698f515b8aa45e5f3675";

export default node;
