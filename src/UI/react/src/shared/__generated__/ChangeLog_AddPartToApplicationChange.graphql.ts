/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_AddPartToApplicationChange = {
    readonly addedPart: {
        readonly name: string;
    };
    readonly " $refType": "ChangeLog_AddPartToApplicationChange";
};
export type ChangeLog_AddPartToApplicationChange$data = ChangeLog_AddPartToApplicationChange;
export type ChangeLog_AddPartToApplicationChange$key = {
    readonly " $data"?: ChangeLog_AddPartToApplicationChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_AddPartToApplicationChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_AddPartToApplicationChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "addedPart",
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
  "type": "AddPartToApplicationChange",
  "abstractKey": null
};
(node as any).hash = 'b9346431a6f714731a17665acb87adc1';
export default node;
