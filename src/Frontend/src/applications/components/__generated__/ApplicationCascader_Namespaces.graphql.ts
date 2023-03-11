/**
 * @generated SignedSource<<cf629b4f12ceb1c4b09abf67118ca2d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationCascader_Namespaces$data = {
  readonly me: {
    readonly namespaces: ReadonlyArray<string>;
  } | null;
  readonly " $fragmentType": "ApplicationCascader_Namespaces";
};
export type ApplicationCascader_Namespaces$key = {
  readonly " $data"?: ApplicationCascader_Namespaces$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationCascader_Namespaces">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationCascader_Namespaces",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespaces",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "55fb1f670346f4962302ec762a4fbdfa";

export default node;
