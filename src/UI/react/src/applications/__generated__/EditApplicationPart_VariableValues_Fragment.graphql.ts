/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_VariableValues_Fragment = {
    readonly variableValues: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"VariableValueList_values">;
    }>;
    readonly " $refType": "EditApplicationPart_VariableValues_Fragment";
};
export type EditApplicationPart_VariableValues_Fragment$data = EditApplicationPart_VariableValues_Fragment;
export type EditApplicationPart_VariableValues_Fragment$key = {
    readonly " $data"?: EditApplicationPart_VariableValues_Fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_VariableValues_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPart_VariableValues_Fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "variableValues",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VariableValueList_values"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
(node as any).hash = 'a8f4d78d9ebd3128729f8c294850c457';
export default node;
