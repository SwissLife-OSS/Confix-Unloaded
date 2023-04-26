/**
 * @generated SignedSource<<5696118291fc18d32221b0caf6b27013>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddComponentsToApplicationPartDialog$data = {
  readonly application: {
    readonly id: string;
    readonly namespace: string;
  } | null;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "AddComponentsToApplicationPartDialog";
};
export type AddComponentsToApplicationPartDialog$key = {
  readonly " $data"?: AddComponentsToApplicationPartDialog$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddComponentsToApplicationPartDialog">;
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
  "name": "AddComponentsToApplicationPartDialog",
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
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  "type": "ApplicationPart",
  "abstractKey": null
};
})();

(node as any).hash = "51ef95e88fa089982dd774e2e97dbc8b";

export default node;
