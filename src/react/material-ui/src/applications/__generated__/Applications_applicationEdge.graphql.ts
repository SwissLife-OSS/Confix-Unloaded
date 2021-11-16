/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Applications_applicationEdge = ReadonlyArray<{
    readonly node: {
        readonly id: string;
        readonly name: string;
        readonly namespace: string | null;
    };
    readonly " $refType": "Applications_applicationEdge";
}>;
export type Applications_applicationEdge$data = Applications_applicationEdge;
export type Applications_applicationEdge$key = ReadonlyArray<{
    readonly " $data"?: Applications_applicationEdge$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Applications_applicationEdge">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Applications_applicationEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespace",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationsEdge",
  "abstractKey": null
};
(node as any).hash = '9fab1cffa55c6d3459452a8970fded9a';
export default node;
