/**
 * @generated SignedSource<<a045f08050864404a9262655be4d231a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ApplicationPartComponents_ApplicationPartComponentsDisplay$data = {
  readonly definition: {
    readonly id: string;
    readonly name: string;
    readonly state: ComponentState;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ApplicationPartComponents_ApplicationPartComponentsDisplay";
};
export type ApplicationPartComponents_ApplicationPartComponentsDisplay$key = {
  readonly " $data"?: ApplicationPartComponents_ApplicationPartComponentsDisplay$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartComponents_ApplicationPartComponentsDisplay">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplicationPartComponents_ApplicationPartComponentsDisplay",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Component",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "name": "state",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPartComponent",
  "abstractKey": null
};
})();

(node as any).hash = "c7f8ad3f829b1f980fc1a3d7ebeb28c1";

export default node;
