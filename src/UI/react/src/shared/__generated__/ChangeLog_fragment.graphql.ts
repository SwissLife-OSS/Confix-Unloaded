/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_fragment = ReadonlyArray<{
    readonly id: string;
    readonly change: {
        readonly kind: string;
        readonly __typename: string;
        readonly " $fragmentRefs": FragmentRefs<"ChangeLog_RenameApplicationChange" | "ChangeLog_RenameApplicationPartChange" | "ChangeLog_AddComponentToApplicationPartChange" | "ChangeLog_AddPartToApplicationChange" | "ChangeLog_RemoveComponentFromApplicationPartChange" | "ChangeLog_RemovePartFromApplicationChange" | "ChangeLog_ApplicationPartComponentValuesChange" | "ChangeLog_ComponentSchemaChange" | "ChangeLog_ComponentValuesChange" | "ChangeLog_CreateComponentChange" | "ChangeLog_RemoveComponentChange" | "ChangeLog_RenameComponentChange" | "ChangeLog_CreateVariableChange" | "ChangeLog_DeleteVariableValueChange" | "ChangeLog_RenameVariableChange" | "ChangeLog_VariableValueChange">;
    };
    readonly modifiedAt: unknown;
    readonly modifiedBy: {
        readonly email: string;
    };
    readonly " $refType": "ChangeLog_fragment";
}>;
export type ChangeLog_fragment$data = ChangeLog_fragment;
export type ChangeLog_fragment$key = ReadonlyArray<{
    readonly " $data"?: ChangeLog_fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_fragment">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ChangeLog_fragment",
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
        }
      ],
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
    }
  ],
  "type": "ChangeLog",
  "abstractKey": null
};
(node as any).hash = 'a5478522d32e0f89178944f233e70940';
export default node;