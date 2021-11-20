/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
export type EditApplicationPartComponent_component = {
    readonly id: string;
    readonly definition: {
        readonly id: string;
        readonly name: string;
        readonly state: ComponentState;
    };
    readonly " $refType": "EditApplicationPartComponent_component";
};
export type EditApplicationPartComponent_component$data = EditApplicationPartComponent_component;
export type EditApplicationPartComponent_component$key = {
    readonly " $data"?: EditApplicationPartComponent_component$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPartComponent_component">;
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
  "name": "EditApplicationPartComponent_component",
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
(node as any).hash = '1ae6af347b2bf301568d8d16bb78f9b9';
export default node;
