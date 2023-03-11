/**
 * @generated SignedSource<<c8e3931b1bab08f169de8f8556c9ab84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader_Data$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Applications" | "ApplicationCascader_Namespaces">;
  readonly " $fragmentType": "ApplicationCascader_Data";
};
export type ApplicationCascader_Data$key = {
  readonly " $data"?: ApplicationCascader_Data$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Data">;
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
  "name": "ApplicationCascader_Data",
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

(node as any).hash = "552a609da5a7efb7e839e3129b5cf47b";

export default node;
