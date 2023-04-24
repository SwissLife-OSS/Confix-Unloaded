/**
 * @generated SignedSource<<6fb0b5e9ec3919167241482850eb47ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditGroup_Form$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EditGroup_Header" | "EditGroup_RequirementsSection" | "EditGroup_RoleScopeSection">;
  readonly " $fragmentType": "EditGroup_Form";
};
export type EditGroup_Form$key = {
  readonly " $data"?: EditGroup_Form$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditGroup_Form">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditGroup_Form",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditGroup_RoleScopeSection"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditGroup_Header"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditGroup_RequirementsSection"
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "750c7d46640d81984fab71f13fb98a8f";

export default node;
