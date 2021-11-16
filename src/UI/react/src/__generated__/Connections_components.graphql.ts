/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Connections_components = ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly " $refType": "Connections_components";
}>;
export type Connections_components$data = Connections_components;
export type Connections_components$key = ReadonlyArray<{
    readonly " $data"?: Connections_components$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Connections_components">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Connections_components",
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
  "type": "Component",
  "abstractKey": null
};
(node as any).hash = '36d6276464536d9d0060b6883e76ba09';
export default node;
