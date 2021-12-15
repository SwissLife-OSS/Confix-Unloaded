/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_AddComponentToApplicationPartChange = {
    readonly addedComponent: {
        readonly definition: {
            readonly name: string;
        };
    };
    readonly " $refType": "ChangeLog_AddComponentToApplicationPartChange";
};
export type ChangeLog_AddComponentToApplicationPartChange$data = ChangeLog_AddComponentToApplicationPartChange;
export type ChangeLog_AddComponentToApplicationPartChange$key = {
    readonly " $data"?: ChangeLog_AddComponentToApplicationPartChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_AddComponentToApplicationPartChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_AddComponentToApplicationPartChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPartComponent",
      "kind": "LinkedField",
      "name": "addedComponent",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Component",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
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
      "storageKey": null
    }
  ],
  "type": "AddComponentToApplicationPartChange",
  "abstractKey": null
};
(node as any).hash = '18b22fd9090cb7fe33d80fa2368876ac';
export default node;
