/**
 * @generated SignedSource<<150dbc256bec08b2ab39803e9c9a2e28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart$data = {
  readonly application: {
    readonly id: string;
    readonly name: string;
    readonly namespace: string;
  } | null;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartChangeLog" | "ApplicationPartComponents" | "EditApplicationPart_DeployedEnvironments" | "EditApplicationPart_Variable" | "PublishedApplicationParts">;
  readonly " $fragmentType": "EditApplicationPart";
};
export type EditApplicationPart$key = {
  readonly " $data"?: EditApplicationPart$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
  "name": "EditApplicationPart",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespace",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationPartComponents"
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPart_Variable"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ApplicationPartChangeLog"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPart_DeployedEnvironments"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublishedApplicationParts"
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();

(node as any).hash = "34059d2a2c2e1ca04e19a5132b002395";

export default node;
