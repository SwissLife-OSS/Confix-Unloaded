/**
 * @generated SignedSource<<5093829d2c3d7d01964ebe3f1bd7d4f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ApplicationPartComponents_component$data = {
  readonly definition: {
    readonly id: string;
    readonly name: string;
    readonly state: ComponentState;
  };
  readonly id: string;
  readonly " $fragmentType": "ApplicationPartComponents_component";
};
export type ApplicationPartComponents_component$key = {
  readonly " $data"?: ApplicationPartComponents_component$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartComponents_component">;
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
  "name": "ApplicationPartComponents_component",
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

(node as any).hash = "b8133dd74bbad449f59e51e1e56de479";

export default node;
