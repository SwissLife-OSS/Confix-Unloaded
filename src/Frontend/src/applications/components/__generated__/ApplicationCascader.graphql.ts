/**
 * @generated SignedSource<<31d32dafe801e79e39bb9bf6131d3126>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Applications" | "ApplicationCascader_Namespaces">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationCascader_Namespaces"
    },
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

(node as any).hash = "52358c8ecd819df6c1156a74f4ae49ac";

export default node;
