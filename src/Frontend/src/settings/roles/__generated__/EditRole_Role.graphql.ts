/**
 * @generated SignedSource<<4e87a87a39cabf056772e90e82e13f8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EditRole_Role$data = {
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
  readonly " $fragmentType": "EditRole_Role";
};
export type EditRole_Role$key = {
  readonly " $data"?: EditRole_Role$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditRole_Role">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditRole_Role",
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
    }
  ],
  "type": "Role",
  "abstractKey": null
};

(node as any).hash = "367d66aa85b389551c90517e0dbdec6c";

export default node;
