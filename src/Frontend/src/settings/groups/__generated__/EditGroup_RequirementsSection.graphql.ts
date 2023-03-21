/**
 * @generated SignedSource<<b56c54c4da573d8e6fd475c4b3ba93f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditGroup_RequirementsSection$data = {
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
  readonly " $fragmentType": "EditGroup_RequirementsSection";
};
export type EditGroup_RequirementsSection$key = {
  readonly " $data"?: EditGroup_RequirementsSection$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditGroup_RequirementsSection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditGroup_RequirementsSection",
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
    }
  ],
  "type": "Group",
  "abstractKey": null
};

(node as any).hash = "60c06d54519ed4a914eac2b17be92cad";

export default node;
