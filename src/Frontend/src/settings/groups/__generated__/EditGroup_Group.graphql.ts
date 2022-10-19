/**
 * @generated SignedSource<<f5aadfc5a7233f8d879d0b152c76ed24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditGroup_Group$data = {
  readonly id: string;
  readonly name: string;
  readonly requirements: ReadonlyArray<{
    readonly __typename: "ClaimRequirement";
    readonly type: string;
    readonly value: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly roles: ReadonlyArray<{
    readonly namespace: string;
    readonly roles: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  }>;
  readonly " $fragmentType": "EditGroup_Group";
};
export type EditGroup_Group$key = {
  readonly " $data"?: EditGroup_Group$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditGroup_Group">;
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
  "name": "EditGroup_Group",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "requirements",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "type": "ClaimRequirement",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
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
  "type": "Group",
  "abstractKey": null
};
})();

(node as any).hash = "d96589a8d90529950abd444ec5c7a9ae";

export default node;
