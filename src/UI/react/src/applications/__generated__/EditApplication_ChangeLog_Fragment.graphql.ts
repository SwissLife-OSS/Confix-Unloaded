/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplication_ChangeLog_Fragment = {
    readonly changeLog: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ChangeLog_fragment">;
    }>;
    readonly " $refType": "EditApplication_ChangeLog_Fragment";
};
export type EditApplication_ChangeLog_Fragment$data = EditApplication_ChangeLog_Fragment;
export type EditApplication_ChangeLog_Fragment$key = {
    readonly " $data"?: EditApplication_ChangeLog_Fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplication_ChangeLog_Fragment">;
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
(node as any).hash = '47b3d1ccea143b7989c01791378c8187';
export default node;
