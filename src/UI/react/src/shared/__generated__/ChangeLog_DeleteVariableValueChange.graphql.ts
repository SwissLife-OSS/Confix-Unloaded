/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_DeleteVariableValueChange = {
    readonly variable: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_DeleteVariableValueChange";
};
export type ChangeLog_DeleteVariableValueChange$data = ChangeLog_DeleteVariableValueChange;
export type ChangeLog_DeleteVariableValueChange$key = {
    readonly " $data"?: ChangeLog_DeleteVariableValueChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_DeleteVariableValueChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_DeleteVariableValueChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
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
  "type": "DeleteVariableValueChange",
  "abstractKey": null
};
(node as any).hash = 'ad734ac110fc2fd23202b145a82250f9';
export default node;
