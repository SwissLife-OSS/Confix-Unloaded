/**
 * @generated SignedSource<<0c2c9b085ca9736f4ec0e506eafaaf65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CompareApplicationPartComponentVersions_Refetchable_Query$data = {
  readonly fromValues: string | null;
  readonly toValues: string | null;
  readonly " $fragmentType": "CompareApplicationPartComponentVersions_Refetchable_Query";
};
export type CompareApplicationPartComponentVersions_Refetchable_Query$key = {
  readonly " $data"?: CompareApplicationPartComponentVersions_Refetchable_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CompareApplicationPartComponentVersions_Refetchable_Query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "from"
    },
    {
      "kind": "RootArgument",
      "name": "to"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CompareApplicationPartComponentVersions_Refetchable_Query",
  "selections": [
    {
      "alias": "fromValues",
      "args": [
        {
          "kind": "Variable",
          "name": "version",
          "variableName": "from"
        }
      ],
      "kind": "ScalarField",
      "name": "values",
      "storageKey": null
    },
    {
      "alias": "toValues",
      "args": [
        {
          "kind": "Variable",
          "name": "version",
          "variableName": "to"
        }
      ],
      "kind": "ScalarField",
      "name": "values",
      "storageKey": null
    }
  ],
  "type": "ApplicationPartComponent",
  "abstractKey": null
};

(node as any).hash = "e8a5d5d4ba168cd452e38c2394b12d0c";

export default node;
