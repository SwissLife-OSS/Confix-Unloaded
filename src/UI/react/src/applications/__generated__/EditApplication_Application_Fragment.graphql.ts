/**
 * @generated SignedSource<<f417adfff232b8c933ce63a4d1bb0d5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication_Application_Fragment$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly parts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"EditApplication_part">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartSectionHeaderFragment" | "EditApplication_ChangeLog_Fragment" | "EditApplication_VariableValues_Fragment">;
  readonly " $fragmentType": "EditApplication_Application_Fragment";
};
export type EditApplication_Application_Fragment$key = {
  readonly " $data"?: EditApplication_Application_Fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication_Application_Fragment">;
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
      "operation": require('./EditApplicationRefetchApplicationQuery.graphql'),
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

(node as any).hash = "a27ad84c13cc32ede2bf2b354ce275e2";

export default node;
