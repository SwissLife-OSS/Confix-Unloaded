/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RemoveComponentChange = {
    readonly component: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_RemoveComponentChange";
};
export type ChangeLog_RemoveComponentChange$data = ChangeLog_RemoveComponentChange;
export type ChangeLog_RemoveComponentChange$key = {
    readonly " $data"?: ChangeLog_RemoveComponentChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_RemoveComponentChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RemoveComponentChange",
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
  "type": "RemoveComponentChange",
  "abstractKey": null
};
(node as any).hash = '8292bcf87fc3812c488168a9e8bd3713';
export default node;
