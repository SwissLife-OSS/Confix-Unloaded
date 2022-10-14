/**
 * @generated SignedSource<<f6b78f99c56bc5d6cbf011154bffea1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VariablesList_VariableEdge$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "VariablesList_VariableEdge";
};
export type VariablesList_VariableEdge$key = {
  readonly " $data"?: VariablesList_VariableEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"VariablesList_VariableEdge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VariablesList_VariableEdge",
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
  "type": "Variable",
  "abstractKey": null
};

(node as any).hash = "13599b25a6b42dd6487d8ed4c6261b59";

export default node;
