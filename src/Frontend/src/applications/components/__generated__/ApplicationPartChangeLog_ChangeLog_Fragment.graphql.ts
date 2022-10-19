/**
 * @generated SignedSource<<93058a6109c578c13f05b24a2a195dbb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationPartChangeLog_ChangeLog_Fragment$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_fragment">;
  }>;
  readonly " $fragmentType": "ApplicationPartChangeLog_ChangeLog_Fragment";
};
export type ApplicationPartChangeLog_ChangeLog_Fragment$key = {
  readonly " $data"?: ApplicationPartChangeLog_ChangeLog_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartChangeLog_ChangeLog_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationPartChangeLog_ChangeLog_Fragment",
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
  "type": "ApplicationPart",
  "abstractKey": null
};

(node as any).hash = "a182f2cf2a041a527ef43a2dd2266b7a";

export default node;
