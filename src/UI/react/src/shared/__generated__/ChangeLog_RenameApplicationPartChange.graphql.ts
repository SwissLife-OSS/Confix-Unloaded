/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RenameApplicationPartChange = {
    readonly name: string;
    readonly " $refType": "ChangeLog_RenameApplicationPartChange";
};
export type ChangeLog_RenameApplicationPartChange$data = ChangeLog_RenameApplicationPartChange;
export type ChangeLog_RenameApplicationPartChange$key = {
    readonly " $data"?: ChangeLog_RenameApplicationPartChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_RenameApplicationPartChange">;
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
(node as any).hash = 'b2be0a10ce245c32aa3029d165a71c30';
export default node;
