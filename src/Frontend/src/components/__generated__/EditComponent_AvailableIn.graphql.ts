/**
 * @generated SignedSource<<aea87fe2e399cc1943af90da1ab27631>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditComponent_AvailableIn$data = ReadonlyArray<{
  readonly application: {
    readonly name: string;
  } | null;
  readonly applicationId: string | null;
  readonly applicationPart: {
    readonly name: string;
  } | null;
  readonly applicationPartId: string | null;
  readonly namespace: string;
  readonly " $fragmentType": "EditComponent_AvailableIn";
}>;
export type EditComponent_AvailableIn$key = ReadonlyArray<{
  readonly " $data"?: EditComponent_AvailableIn$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_AvailableIn">;
}>;

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "EditComponent_AvailableIn",
  "selections": [
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
      "kind": "ScalarField",
      "name": "applicationId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "applicationPartId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "applicationPart",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "ComponentScope",
  "abstractKey": null
};
})();

(node as any).hash = "a7c6dc395a99271d1fba737e30b95c61";

export default node;
