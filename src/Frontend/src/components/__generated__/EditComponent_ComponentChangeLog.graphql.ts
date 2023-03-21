/**
 * @generated SignedSource<<2dfc465b74a959f2dcf9f963599ec2c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditComponent_ComponentChangeLog$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
  }>;
  readonly " $fragmentType": "EditComponent_ComponentChangeLog";
};
export type EditComponent_ComponentChangeLog$key = {
  readonly " $data"?: EditComponent_ComponentChangeLog$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_ComponentChangeLog">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditComponent_ComponentChangeLog",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ChangeLog",
      "kind": "LinkedField",
      "name": "changeLog",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Component",
  "abstractKey": null
};

(node as any).hash = "3cdeb5b0abfc356796c570533e68466a";

export default node;
