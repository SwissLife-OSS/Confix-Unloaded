/**
 * @generated SignedSource<<79e48c27040e7ecaae5d48745bbc9619>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditEnvironment_IsDeveloperAccessAllowedFrom$data = {
  readonly allowDeveloperAccess: boolean;
  readonly id: string;
  readonly " $fragmentType": "EditEnvironment_IsDeveloperAccessAllowedFrom";
};
export type EditEnvironment_IsDeveloperAccessAllowedFrom$key = {
  readonly " $data"?: EditEnvironment_IsDeveloperAccessAllowedFrom$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_IsDeveloperAccessAllowedFrom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditEnvironment_IsDeveloperAccessAllowedFrom",
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
      "name": "allowDeveloperAccess",
      "storageKey": null
    }
  ],
  "type": "Environment",
  "abstractKey": null
};

(node as any).hash = "607363ee87342251af992d8187b435bf";

export default node;
