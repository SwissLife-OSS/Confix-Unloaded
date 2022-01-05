/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_ComponentValuesChange = {
    readonly kind: string;
    readonly " $refType": "ChangeLog_ComponentValuesChange";
};
export type ChangeLog_ComponentValuesChange$data = ChangeLog_ComponentValuesChange;
export type ChangeLog_ComponentValuesChange$key = {
    readonly " $data"?: ChangeLog_ComponentValuesChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_ComponentValuesChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_ComponentValuesChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kind",
      "storageKey": null
    }
  ],
  "type": "ComponentValuesChange",
  "abstractKey": null
};
(node as any).hash = '218cd94feea966e7185ec9c0b5dabc08';
export default node;
