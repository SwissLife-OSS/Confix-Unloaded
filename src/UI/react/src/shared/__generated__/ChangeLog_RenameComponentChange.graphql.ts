/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RenameComponentChange = {
    readonly component: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_RenameComponentChange";
};
export type ChangeLog_RenameComponentChange$data = ChangeLog_RenameComponentChange;
export type ChangeLog_RenameComponentChange$key = {
    readonly " $data"?: ChangeLog_RenameComponentChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_RenameComponentChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RenameComponentChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Component",
      "kind": "LinkedField",
      "name": "component",
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
  "type": "RenameComponentChange",
  "abstractKey": null
};
(node as any).hash = '312c423b6de092d2a86fd3a97d5776dd';
export default node;
