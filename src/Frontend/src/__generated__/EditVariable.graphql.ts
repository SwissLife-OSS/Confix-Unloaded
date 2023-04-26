/**
 * @generated SignedSource<<232bc43530c406de3efc06f644be4186>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditVariable$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly " $fragmentSpreads": FragmentRefs<"EditVariable_EditVariableForm" | "EditVariable_VariableChangeLog">;
  readonly " $fragmentType": "EditVariable";
};
export type EditVariable$key = {
  readonly " $data"?: EditVariable$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditVariable">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditVariable",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "namespace",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditVariable_EditVariableForm"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditVariable_VariableChangeLog"
    }
  ],
  "type": "Variable",
  "abstractKey": null
};

(node as any).hash = "74c96791da4502fa92ec75a954da15ed";

export default node;
