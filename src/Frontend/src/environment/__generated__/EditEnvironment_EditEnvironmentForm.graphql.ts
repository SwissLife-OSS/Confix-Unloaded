/**
 * @generated SignedSource<<c6c914bf84fc62022a9bbdbd2066ae98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditEnvironment_EditEnvironmentForm$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_Header" | "EditEnvironment_IsDeveloperAccessAllowedFrom" | "EditEnvironment_ParentEnvironement">;
  readonly " $fragmentType": "EditEnvironment_EditEnvironmentForm";
};
export type EditEnvironment_EditEnvironmentForm$key = {
  readonly " $data"?: EditEnvironment_EditEnvironmentForm$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditEnvironment_EditEnvironmentForm">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditEnvironment_EditEnvironmentForm",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditEnvironment_ParentEnvironement"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditEnvironment_IsDeveloperAccessAllowedFrom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditEnvironment_Header"
    }
  ],
  "type": "Environment",
  "abstractKey": null
};

(node as any).hash = "9d131919b5cb321976b991ec41194331";

export default node;
