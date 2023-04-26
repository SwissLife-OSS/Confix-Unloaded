/**
 * @generated SignedSource<<aa79f4820a38737ecf3d2e897b603615>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariableValueList$data = ReadonlyArray<{
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
  readonly " $fragmentType": "VariableValueList";
}>;
export type VariableValueList$key = ReadonlyArray<{
  readonly " $data"?: VariableValueList$data;
  readonly " $fragmentSpreads": FragmentRefs<"VariableValueList">;
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
  "name": "VariableValueList",
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

(node as any).hash = "0072d8d487c1579c1991311ec36f4009";

export default node;
