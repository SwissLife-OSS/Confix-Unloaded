/**
 * @generated SignedSource<<bddb3f392911ade661f725829d0278b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExplorerTree_ApplicationDetails$data = {
  readonly parts: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ExplorerTree_ApplicationPart">;
  }>;
  readonly variableValues: ReadonlyArray<{
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly id: string;
    readonly variable: {
      readonly id: string;
      readonly name: string;
    } | null;
  }>;
  readonly " $fragmentType": "ExplorerTree_ApplicationDetails";
};
export type ExplorerTree_ApplicationDetails$key = {
  readonly " $data"?: ExplorerTree_ApplicationDetails$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExplorerTree_ApplicationDetails">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExplorerTree_ApplicationDetails",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "variableValues",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Environment",
          "kind": "LinkedField",
          "name": "environment",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Variable",
          "kind": "LinkedField",
          "name": "variable",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "parts",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Defer",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ExplorerTree_ApplicationPart"
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};
})();

(node as any).hash = "41b537d1e23a55100078f8891cb66f2e";

export default node;
