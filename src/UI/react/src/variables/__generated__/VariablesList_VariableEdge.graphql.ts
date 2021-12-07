/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type VariablesList_VariableEdge = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "VariablesList_VariableEdge";
};
export type VariablesList_VariableEdge$data = VariablesList_VariableEdge;
export type VariablesList_VariableEdge$key = {
    readonly " $data"?: VariablesList_VariableEdge$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"VariablesList_VariableEdge">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VariablesList_VariableEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Variable",
  "abstractKey": null
};
(node as any).hash = '13599b25a6b42dd6487d8ed4c6261b59';
export default node;
