/**
 * @generated SignedSource<<524396c6ea859fdb551e1cece49797f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Scope = "APPLICATION" | "COMPONENT" | "CONFIGURATION" | "ENVIRONMENT" | "IDENTITY" | "VARIABLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PermissionForm$data = {
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
  readonly " $fragmentType": "PermissionForm";
};
export type PermissionForm$key = {
  readonly " $data"?: PermissionForm$data;
  readonly " $fragmentSpreads": FragmentRefs<"PermissionForm">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PermissionForm",
  "selections": [
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

(node as any).hash = "5df78a16c62c74868c9e59177256d8ee";

export default node;
