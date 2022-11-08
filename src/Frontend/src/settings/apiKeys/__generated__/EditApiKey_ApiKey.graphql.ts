/**
 * @generated SignedSource<<eec328569c3c9e5df0c6c05561e467fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApiKey_ApiKey$data = {
  readonly id: string;
  readonly name: string;
  readonly roles: ReadonlyArray<{
    readonly namespace: string;
    readonly roles: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  }>;
  readonly " $fragmentType": "EditApiKey_ApiKey";
};
export type EditApiKey_ApiKey$key = {
  readonly " $data"?: EditApiKey_ApiKey$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApiKey_ApiKey">;
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
  "name": "EditApiKey_ApiKey",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "RoleScope",
      "kind": "LinkedField",
      "name": "roles",
      "plural": true,
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
          "concreteType": "Role",
          "kind": "LinkedField",
          "name": "roles",
          "plural": true,
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
  "type": "ApiKey",
  "abstractKey": null
};
})();

(node as any).hash = "0584305ab19d35ac2660d18062dd0604";

export default node;
