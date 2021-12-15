/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_ChangeLog_Fragment = {
    readonly changeLog: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ChangeLog_fragment">;
    }>;
    readonly " $refType": "EditApplicationPart_ChangeLog_Fragment";
};
export type EditApplicationPart_ChangeLog_Fragment$data = EditApplicationPart_ChangeLog_Fragment;
export type EditApplicationPart_ChangeLog_Fragment$key = {
    readonly " $data"?: EditApplicationPart_ChangeLog_Fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_ChangeLog_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPart_ChangeLog_Fragment",
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
(node as any).hash = '813036fe24c5529c94fa8aa6ae147f97';
export default node;
