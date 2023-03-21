/**
 * @generated SignedSource<<4cc3b3e90978ffc9c7eadb02dd806518>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditVariable_EditVariableForm$data = {
  readonly isSecret: boolean;
  readonly name: string;
  readonly namespace: string;
  readonly " $fragmentType": "EditVariable_EditVariableForm";
};
export type EditVariable_EditVariableForm$key = {
  readonly " $data"?: EditVariable_EditVariableForm$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditVariable_EditVariableForm">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditVariable_EditVariableForm",
  "selections": [
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSecret",
      "storageKey": null
    }
  ],
  "type": "Variable",
  "abstractKey": null
};

(node as any).hash = "329783322d298bd7fa6bd87838c62040";

export default node;
