/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_CreateVariableChange = {
    readonly variable: {
        readonly name: string;
    } | null;
    readonly " $refType": "ChangeLog_CreateVariableChange";
};
export type ChangeLog_CreateVariableChange$data = ChangeLog_CreateVariableChange;
export type ChangeLog_CreateVariableChange$key = {
    readonly " $data"?: ChangeLog_CreateVariableChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_CreateVariableChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_CreateVariableChange",
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
  "type": "CreateVariableChange",
  "abstractKey": null
};
(node as any).hash = '493c09c20eea46360b88675b280ffd04';
export default node;
