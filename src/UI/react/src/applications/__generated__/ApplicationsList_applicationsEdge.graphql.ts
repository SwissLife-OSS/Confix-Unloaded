/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ApplicationsList_applicationsEdge = {
    readonly id: string;
    readonly name: string;
    readonly namespace: string | null;
    readonly parts: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly components: ReadonlyArray<{
            readonly id: string;
            readonly definition: {
                readonly id: string;
                readonly name: string;
            };
        }>;
    }>;
    readonly " $refType": "ApplicationsList_applicationsEdge";
};
export type ApplicationsList_applicationsEdge$data = ApplicationsList_applicationsEdge;
export type ApplicationsList_applicationsEdge$key = {
    readonly " $data"?: ApplicationsList_applicationsEdge$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ApplicationsList_applicationsEdge">;
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
  "name": "ApplicationsList_applicationsEdge",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
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
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ApplicationPartComponent",
          "kind": "LinkedField",
          "name": "components",
          "plural": true,
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
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Application",
  "abstractKey": null
};
})();
(node as any).hash = 'b13ef3817de6dd565836f0daba25eb2c';
export default node;
