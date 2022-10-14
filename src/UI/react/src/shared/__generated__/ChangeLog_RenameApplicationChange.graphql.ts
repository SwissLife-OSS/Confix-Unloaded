/**
 * @generated SignedSource<<edbb7f01719626b91874d0fb3a78427b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RenameApplicationChange$data = {
  readonly name: string;
  readonly " $fragmentType": "ChangeLog_RenameApplicationChange";
};
export type ChangeLog_RenameApplicationChange$key = {
  readonly " $data"?: ChangeLog_RenameApplicationChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_RenameApplicationChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RenameApplicationChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "RenameApplicationChange",
  "abstractKey": null
};

(node as any).hash = "a7f0718bfaa10331762605e61e1b4b74";

export default node;
