/**
 * @generated SignedSource<<f88dce9e6e2f0131c163b8c1a55a66f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EditApplication_part$data = {
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
      readonly name: string;
      readonly state: ComponentState;
    };
  }>;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "EditApplication_part";
};
export type EditApplication_part$key = {
  readonly " $data"?: EditApplication_part$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_part">;
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
  "name": "EditApplication_part",
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
        {
          "alias": null,
          "args": null,
          "concreteType": "Component",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "state",
              "storageKey": null
            }
          ],
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

(node as any).hash = "974d0a32a784c888788cbcce64c0c4f9";

export default node;
