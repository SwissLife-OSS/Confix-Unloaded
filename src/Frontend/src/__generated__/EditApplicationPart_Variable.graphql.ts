/**
 * @generated SignedSource<<e81b932b3d675ef9b307ca32debd7212>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_Variable$data = {
  readonly application: {
    readonly id: string;
    readonly namespace: string;
  } | null;
  readonly id: string;
  readonly variableValues: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"VariableValueList">;
  }>;
  readonly " $fragmentType": "EditApplicationPart_Variable";
};
export type EditApplicationPart_Variable$key = {
  readonly " $data"?: EditApplicationPart_Variable$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart_Variable">;
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
  "name": "EditApplicationPart_Variable",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "variableValues",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VariableValueList"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();

(node as any).hash = "0ab814479feefcbbf0df184c844e7665";

export default node;
