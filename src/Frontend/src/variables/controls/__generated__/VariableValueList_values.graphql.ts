/**
 * @generated SignedSource<<19d4a89a52ef87cb2e1d4ca74dbf0283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariableValueList_values$data = ReadonlyArray<{
  readonly environment: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly id: string;
  readonly value: string | null;
  readonly variable: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly " $fragmentType": "VariableValueList_values";
}>;
export type VariableValueList_values$key = ReadonlyArray<{
  readonly " $data"?: VariableValueList_values$data;
  readonly " $fragmentSpreads": FragmentRefs<"VariableValueList_values">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "VariableValueList_values",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "environment",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "VariableValue",
  "abstractKey": null
};
})();

(node as any).hash = "5593fe8164e0837e92220c270942cafc";

export default node;
