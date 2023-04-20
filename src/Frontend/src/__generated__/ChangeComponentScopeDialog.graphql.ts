/**
 * @generated SignedSource<<ec70546fe9faa21adcb8de56fce1edc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeComponentScopeDialog$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader">;
  readonly " $fragmentType": "ChangeComponentScopeDialog";
};
export type ChangeComponentScopeDialog$key = {
  readonly " $data"?: ChangeComponentScopeDialog$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeComponentScopeDialog">;
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
  "name": "ChangeComponentScopeDialog",
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
      "name": "ApplicationCascader"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "f393cfb17b0e10925928226da0f32917";

export default node;
