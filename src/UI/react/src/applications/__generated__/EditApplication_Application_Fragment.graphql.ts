/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import EditApplicationRefetchApplicationQuery from "./EditApplicationRefetchApplicationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type EditApplication_Application_Fragment = {
    readonly id: string;
    readonly name: string;
    readonly namespace: string | null;
    readonly parts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"EditApplication_part">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"EditApplication_VariableValues_Fragment" | "EditApplication_ChangeLog_Fragment" | "ApplicationPartSectionHeaderFragment">;
    readonly " $refType": "EditApplication_Application_Fragment";
};
export type EditApplication_Application_Fragment$data = EditApplication_Application_Fragment;
export type EditApplication_Application_Fragment$key = {
    readonly " $data"?: EditApplication_Application_Fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplication_Application_Fragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": EditApplicationRefetchApplicationQuery,
      "identifierField": "id"
    }
  },
  "name": "EditApplication_Application_Fragment",
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
      "kind": "ScalarField",
      "name": "namespace",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "parts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_part"
        }
      ],
      "storageKey": null
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_VariableValues_Fragment"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_ChangeLog_Fragment"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationPartSectionHeaderFragment"
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = 'a27ad84c13cc32ede2bf2b354ce275e2';
export default node;
