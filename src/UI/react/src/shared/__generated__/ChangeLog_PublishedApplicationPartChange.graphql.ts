/**
 * @generated SignedSource<<8fc5485fd343cc3fff7e59e968270949>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_PublishedApplicationPartChange$data = {
  readonly part: {
    readonly name: string;
  } | null;
  readonly partVersion: number;
  readonly " $fragmentType": "ChangeLog_PublishedApplicationPartChange";
};
export type ChangeLog_PublishedApplicationPartChange$key = {
  readonly " $data"?: ChangeLog_PublishedApplicationPartChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_PublishedApplicationPartChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_PublishedApplicationPartChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partVersion",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "part",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PublishedApplicationPartChange",
  "abstractKey": null
};

(node as any).hash = "6d5d5723435aa7a3cb48b9c6c903a500";

export default node;
