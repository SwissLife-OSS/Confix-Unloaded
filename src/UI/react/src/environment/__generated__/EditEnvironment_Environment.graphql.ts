/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditEnvironment_Environment = {
    readonly id: string;
    readonly name: string;
    readonly parent: {
        readonly id: string;
        readonly name: string;
    } | null;
    readonly " $refType": "EditEnvironment_Environment";
};
export type EditEnvironment_Environment$data = EditEnvironment_Environment;
export type EditEnvironment_Environment$key = {
    readonly " $data"?: EditEnvironment_Environment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditEnvironment_Environment">;
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
  "name": "EditEnvironment_Environment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Environment",
      "kind": "LinkedField",
      "name": "parent",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Environment",
  "abstractKey": null
};
})();
(node as any).hash = 'eb11ee17a07a5e4b77b058c58308697a';
export default node;
