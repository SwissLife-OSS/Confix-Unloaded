/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_CreateComponentChange = {
    readonly component: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_CreateComponentChange";
};
export type ChangeLog_CreateComponentChange$data = ChangeLog_CreateComponentChange;
export type ChangeLog_CreateComponentChange$key = {
    readonly " $data"?: ChangeLog_CreateComponentChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_CreateComponentChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_CreateComponentChange",
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
  "type": "CreateComponentChange",
  "abstractKey": null
};
(node as any).hash = '0ab5287e5ae1898195922b9aeb08f1ee';
export default node;
