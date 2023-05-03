/**
 * @generated SignedSource<<bc9e7c142955e45d58a41d5c78ec7ca7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Applications">;
  readonly " $fragmentType": "ApplicationCascader";
};
export type ApplicationCascader$key = {
  readonly " $data"?: ApplicationCascader$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "search"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationCascader",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "search",
          "variableName": "search"
        }
      ],
      "kind": "FragmentSpread",
      "name": "ApplicationCascader_Applications"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "69a92a7c222a26cd656edc2ee42557a0";

export default node;
