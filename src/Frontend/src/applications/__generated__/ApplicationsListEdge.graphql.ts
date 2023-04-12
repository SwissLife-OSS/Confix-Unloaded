/**
 * @generated SignedSource<<64e60bc6cc781966820ceb6a0982784a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationsListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly parts: ReadonlyArray<{
    readonly components: ReadonlyArray<{
      readonly definition: {
        readonly id: string;
        readonly name: string;
      } | null;
      readonly id: string;
    }>;
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "ApplicationsListItem";
};
export type ApplicationsListItem$key = {
  readonly " $data"?: ApplicationsListItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationsListItem">;
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
  "name": "ApplicationsListItem",
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

(node as any).hash = "926eb0ddf6adc802fdccb3903a034b84";

export default node;