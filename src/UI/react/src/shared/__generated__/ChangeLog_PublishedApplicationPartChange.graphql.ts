/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_PublishedApplicationPartChange = {
    readonly partVersion: number;
    readonly part: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_PublishedApplicationPartChange";
};
export type ChangeLog_PublishedApplicationPartChange$data = ChangeLog_PublishedApplicationPartChange;
export type ChangeLog_PublishedApplicationPartChange$key = {
    readonly " $data"?: ChangeLog_PublishedApplicationPartChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_PublishedApplicationPartChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_PublishedApplicationPartChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partVersion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "part",
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
  "type": "PublishedApplicationPartChange",
  "abstractKey": null
};
(node as any).hash = '6d5d5723435aa7a3cb48b9c6c903a500';
export default node;
