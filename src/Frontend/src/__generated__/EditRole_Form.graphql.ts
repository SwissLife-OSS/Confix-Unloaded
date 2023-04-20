/**
 * @generated SignedSource<<15839a020c1aabeb77f7c466b53323dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE";
import { FragmentRefs } from "relay-runtime";
export type EditRole_Form$data = {
  readonly id: string;
  readonly name: string;
  readonly permissions: ReadonlyArray<{
    readonly permissions: {
      readonly isClaim: boolean;
      readonly isDecrypt: boolean;
      readonly isPublish: boolean;
      readonly isRead: boolean;
      readonly isWrite: boolean;
    };
    readonly scope: Scope;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"EditRole_Header">;
  readonly " $fragmentType": "EditRole_Form";
};
export type EditRole_Form$key = {
  readonly " $data"?: EditRole_Form$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditRole_Form">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditRole_Form",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "concreteType": "Permission",
      "kind": "LinkedField",
      "name": "permissions",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "scope",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PermissionsFlags",
          "kind": "LinkedField",
          "name": "permissions",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isRead",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isWrite",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isClaim",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isPublish",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isDecrypt",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditRole_Header"
    }
  ],
  "type": "Role",
  "abstractKey": null
};

(node as any).hash = "9bb30d2121bf8ed0f0b6c59597eaa4a3";

export default node;
