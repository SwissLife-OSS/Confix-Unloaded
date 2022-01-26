/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
export type ApplicationPartComponents_component = {
    readonly id: string;
    readonly definition: {
        readonly id: string;
        readonly name: string;
        readonly state: ComponentState;
    };
    readonly " $refType": "ApplicationPartComponents_component";
};
export type ApplicationPartComponents_component$data = ApplicationPartComponents_component;
export type ApplicationPartComponents_component$key = {
    readonly " $data"?: ApplicationPartComponents_component$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ApplicationPartComponents_component">;
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
(node as any).hash = 'b8133dd74bbad449f59e51e1e56de479';
export default node;
