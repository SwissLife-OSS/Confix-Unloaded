/**
 * @generated SignedSource<<eb2bb8ac803d60b3ba66515886b7e568>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartSectionHeader" | "EditApplication_ApplicationChangeLog" | "EditApplication_ApplicationParts" | "EditApplication_Variables">;
  readonly " $fragmentType": "EditApplication";
};
export type EditApplication$key = {
  readonly " $data"?: EditApplication$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplication">;
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
      "operation": require('./EditApplication_RefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "EditApplication",
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
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_Variables"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplication_ApplicationChangeLog"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditApplication_ApplicationParts"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationPartSectionHeader"
    }
  ],
  "type": "Application",
  "abstractKey": null
};

(node as any).hash = "41d397e36ce74443b51b127622c28ef0";

export default node;
