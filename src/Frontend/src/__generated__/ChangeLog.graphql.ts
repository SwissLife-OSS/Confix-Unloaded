/**
 * @generated SignedSource<<9c269eb1341bc946807ff279fd9e7e9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog$data = ReadonlyArray<{
  readonly change: {
    readonly __typename: string;
    readonly kind: string;
    readonly versionOfApp?: number;
    readonly versionOfComponent?: number;
    readonly versionOfPart?: number;
    readonly versionOfPartComponent?: number;
    readonly versionOfVariable?: number;
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_AddComponentToApplicationPartChange" | "ChangeLog_AddPartToApplicationChange" | "ChangeLog_ApplicationPartComponentValuesChange" | "ChangeLog_ComponentSchemaChange" | "ChangeLog_ComponentValuesChange" | "ChangeLog_CreateComponentChange" | "ChangeLog_CreateVariableChange" | "ChangeLog_DeleteVariableValueChange" | "ChangeLog_PublishedApplicationPartChange" | "ChangeLog_RemoveComponentChange" | "ChangeLog_RemoveComponentFromApplicationPartChange" | "ChangeLog_RemovePartFromApplicationChange" | "ChangeLog_RenameApplicationChange" | "ChangeLog_RenameApplicationPartChange" | "ChangeLog_RenameComponentChange" | "ChangeLog_RenameVariableChange" | "ChangeLog_VariableValueChange">;
  };
  readonly id: string;
  readonly modifiedAt: any;
  readonly modifiedBy: {
    readonly email: string | null;
  };
  readonly " $fragmentType": "ChangeLog";
}>;
export type ChangeLog$key = ReadonlyArray<{
  readonly " $data"?: ChangeLog$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ChangeLog",
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
      "name": "modifiedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserInfo",
      "kind": "LinkedField",
      "name": "modifiedBy",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "change",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "kind",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RenameApplicationChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RenameApplicationPartChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_AddComponentToApplicationPartChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_AddPartToApplicationChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RemoveComponentFromApplicationPartChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RemovePartFromApplicationChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_ApplicationPartComponentValuesChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_ComponentSchemaChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_ComponentValuesChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_CreateComponentChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RemoveComponentChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RenameComponentChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_CreateVariableChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_DeleteVariableValueChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_RenameVariableChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_VariableValueChange"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog_PublishedApplicationPartChange"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "versionOfApp",
              "args": null,
              "kind": "ScalarField",
              "name": "applicationVersion",
              "storageKey": null
            }
          ],
          "type": "ApplicationChange",
          "abstractKey": "__isApplicationChange"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "versionOfPart",
              "args": null,
              "kind": "ScalarField",
              "name": "partVersion",
              "storageKey": null
            }
          ],
          "type": "ApplicationPartChange",
          "abstractKey": "__isApplicationPartChange"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "versionOfPartComponent",
              "args": null,
              "kind": "ScalarField",
              "name": "partComponentVersion",
              "storageKey": null
            }
          ],
          "type": "ApplicationPartComponentChange",
          "abstractKey": "__isApplicationPartComponentChange"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "versionOfComponent",
              "args": null,
              "kind": "ScalarField",
              "name": "componentVersion",
              "storageKey": null
            }
          ],
          "type": "ComponentChange",
          "abstractKey": "__isComponentChange"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "versionOfVariable",
              "args": null,
              "kind": "ScalarField",
              "name": "variableVersion",
              "storageKey": null
            }
          ],
          "type": "VariableChange",
          "abstractKey": "__isVariableChange"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ChangeLog",
  "abstractKey": null
};

(node as any).hash = "eebf0586589af625fbb906640a29d7b4";

export default node;
