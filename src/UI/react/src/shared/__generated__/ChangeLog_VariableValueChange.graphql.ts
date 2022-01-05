/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_VariableValueChange = {
    readonly variable: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_VariableValueChange";
};
export type ChangeLog_VariableValueChange$data = ChangeLog_VariableValueChange;
export type ChangeLog_VariableValueChange$key = {
    readonly " $data"?: ChangeLog_VariableValueChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_VariableValueChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_VariableValueChange",
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
  "type": "VariableValueChange",
  "abstractKey": null
};
(node as any).hash = '89c79d62c978b8fb03dcbb92abeaa550';
export default node;
