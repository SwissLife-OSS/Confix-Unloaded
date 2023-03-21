/**
 * @generated SignedSource<<65b50b02083ea39a3a454d0c4ea25be3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication_ApplicationParts$data = {
  readonly id: string;
  readonly parts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"EditApplication_ApplicationPartsDisplay">;
  }>;
  readonly " $fragmentType": "EditApplication_ApplicationParts";
};
export type EditApplication_ApplicationParts$key = {
  readonly " $data"?: EditApplication_ApplicationParts$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_ApplicationParts">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplication_ApplicationParts",
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
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "parts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_ApplicationPartsDisplay"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};

(node as any).hash = "eb47e27ee3250bb505f3e979315ec3d5";

export default node;
