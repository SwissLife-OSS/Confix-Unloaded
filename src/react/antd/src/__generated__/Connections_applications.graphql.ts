/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type Connections_applications = ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly namespace: string | null;
    readonly parts: ReadonlyArray<{
        readonly name: string;
    }>;
    readonly " $refType": "Connections_applications";
}>;
export type Connections_applications$data = Connections_applications;
export type Connections_applications$key = ReadonlyArray<{
    readonly " $data"?: Connections_applications$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"Connections_applications">;
}>;



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
  "metadata": {
    "plural": true
  },
  "name": "Connections_applications",
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
(node as any).hash = '754af67edfb263a3c5cd88080fe29269';
export default node;
