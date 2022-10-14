/**
 * @generated SignedSource<<4e0df201043ca8602ca1569ba695ca16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ComponentsList_componentEdge$data = ReadonlyArray<{
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ComponentsList_componentEdge";
}>;
export type ComponentsList_componentEdge$key = ReadonlyArray<{
  readonly " $data"?: ComponentsList_componentEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ComponentsList_componentEdge">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ComponentsList_componentEdge",
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
  "type": "Component",
  "abstractKey": null
};

(node as any).hash = "5e041d4ab7d6acc95bca4b612a7811b3";

export default node;
