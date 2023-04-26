/**
 * @generated SignedSource<<ee3e65bea41c971822da069194d998fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RenameApplicationPartChange$data = {
  readonly name: string;
  readonly " $fragmentType": "ChangeLog_RenameApplicationPartChange";
};
export type ChangeLog_RenameApplicationPartChange$key = {
  readonly " $data"?: ChangeLog_RenameApplicationPartChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_RenameApplicationPartChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RenameApplicationPartChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "RenameApplicationPartChange",
  "abstractKey": null
};

(node as any).hash = "b2be0a10ce245c32aa3029d165a71c30";

export default node;
