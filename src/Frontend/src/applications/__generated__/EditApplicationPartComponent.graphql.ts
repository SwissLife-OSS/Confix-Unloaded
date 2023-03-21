/**
 * @generated SignedSource<<2eddebce52fe956d9fa37cfe8e6b5669>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartComponent$data = {
  readonly applicationPartComponentById: {
    readonly applicationPart: {
      readonly application: {
        readonly name: string;
        readonly namespace: string;
      } | null;
      readonly name: string;
    } | null;
    readonly definition: {
      readonly name: string;
    } | null;
    readonly version: number;
    readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_ApplicationPartComponentChangeLog">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_EditConfiguration">;
  readonly " $fragmentType": "EditApplicationPartComponent";
};
export type EditApplicationPartComponent$key = {
  readonly " $data"?: EditApplicationPartComponent$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "partComponentId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPartComponent",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "partComponentId",
          "variableName": "partComponentId"
        }
      ],
      "concreteType": "ApplicationPartComponent",
      "kind": "LinkedField",
      "name": "applicationPartComponentById",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ApplicationPart",
          "kind": "LinkedField",
          "name": "applicationPart",
          "plural": false,
          "selections": [
            (v0/*: any*/),
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
          "storageKey": null
        },
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "version",
          "storageKey": null
        },
        {
          "kind": "Defer",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "EditApplicationPartComponent_ApplicationPartComponentChangeLog"
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditApplicationPartComponent_EditConfiguration"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "15f6cb77579468ab20a2ace378222f11";

export default node;
