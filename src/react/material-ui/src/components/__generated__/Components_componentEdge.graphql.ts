/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Components_componentEdge = ReadonlyArray<{
    readonly node: {
        readonly id: string;
        readonly name: string;
    };
    readonly " $refType": "Components_componentEdge";
}>;
export type Components_componentEdge$data = Components_componentEdge;
export type Components_componentEdge$key = ReadonlyArray<{
    readonly " $data"?: Components_componentEdge$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Components_componentEdge">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Components_componentEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Component",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ComponentsEdge",
  "abstractKey": null
};
(node as any).hash = '26b1eb23720f29945870dae6ded5aad5';
export default node;
