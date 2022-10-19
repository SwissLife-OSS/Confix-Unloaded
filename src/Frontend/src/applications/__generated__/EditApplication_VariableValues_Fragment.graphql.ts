/**
 * @generated SignedSource<<71a534a2b8a964942bb63c4c7ce0a516>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication_VariableValues_Fragment$data = {
  readonly variableValues: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"VariableValueList_values">;
  }>;
  readonly " $fragmentType": "EditApplication_VariableValues_Fragment";
};
export type EditApplication_VariableValues_Fragment$key = {
  readonly " $data"?: EditApplication_VariableValues_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_VariableValues_Fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplication_VariableValues_Fragment",
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
  "type": "Application",
  "abstractKey": null
};

(node as any).hash = "e91cf98abe9627682e3cb95136dbe800";

export default node;
