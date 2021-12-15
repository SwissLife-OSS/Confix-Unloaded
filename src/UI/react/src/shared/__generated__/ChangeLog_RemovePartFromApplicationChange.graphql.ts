/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RemovePartFromApplicationChange = {
    readonly removedPart: {
        readonly name: string;
    };
    readonly " $refType": "ChangeLog_RemovePartFromApplicationChange";
};
export type ChangeLog_RemovePartFromApplicationChange$data = ChangeLog_RemovePartFromApplicationChange;
export type ChangeLog_RemovePartFromApplicationChange$key = {
    readonly " $data"?: ChangeLog_RemovePartFromApplicationChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_RemovePartFromApplicationChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RemovePartFromApplicationChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "removedPart",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RemovePartFromApplicationChange",
  "abstractKey": null
};
(node as any).hash = '95016e09181d243bee3af01f98cce9b5';
export default node;
