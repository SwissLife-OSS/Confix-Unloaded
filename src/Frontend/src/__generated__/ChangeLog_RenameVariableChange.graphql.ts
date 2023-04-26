/**
 * @generated SignedSource<<b2b160086b240756048873b9dc63c806>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RenameVariableChange$data = {
  readonly variable: {
    readonly name: string;
  } | null;
  readonly " $fragmentType": "ChangeLog_RenameVariableChange";
};
export type ChangeLog_RenameVariableChange$key = {
  readonly " $data"?: ChangeLog_RenameVariableChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_RenameVariableChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RenameVariableChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
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
  "type": "RenameVariableChange",
  "abstractKey": null
};

(node as any).hash = "bc13644743cc37af9d4f221ef2f8e827";

export default node;
