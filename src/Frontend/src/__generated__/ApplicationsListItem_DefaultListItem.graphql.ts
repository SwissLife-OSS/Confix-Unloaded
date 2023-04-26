/**
 * @generated SignedSource<<823269b70a34c9ee3bdbdebb8d81b841>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationsListItem_DefaultListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly parts: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly " $fragmentType": "ApplicationsListItem_DefaultListItem";
};
export type ApplicationsListItem_DefaultListItem$key = {
  readonly " $data"?: ApplicationsListItem_DefaultListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem_DefaultListItem">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationsListItem_DefaultListItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "parts",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};
})();

(node as any).hash = "c26cb683f75774a0775c87bb0a83f273";

export default node;
