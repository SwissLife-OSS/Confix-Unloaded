/**
 * @generated SignedSource<<e0c36def46a53b161471b31edfc87166>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplicationPartComponents$data = {
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
    } | null;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartComponents_ApplicationPartComponentsDisplay">;
  }>;
  readonly " $fragmentType": "ApplicationPartComponents";
};
export type ApplicationPartComponents$key = {
  readonly " $data"?: ApplicationPartComponents$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartComponents">;
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
  "name": "ApplicationPartComponents",
  "selections": [
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
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ApplicationPartComponents_ApplicationPartComponentsDisplay"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();

(node as any).hash = "533335750e6ab0c4a10c5480b238a30d";

export default node;
