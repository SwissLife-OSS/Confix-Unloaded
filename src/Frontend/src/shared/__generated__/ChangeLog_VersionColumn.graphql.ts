/**
 * @generated SignedSource<<3e323642b25d8a92f700a8568ec59684>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_VersionColumn$data = ReadonlyArray<{
  readonly change: {
    readonly versionOfApp?: number;
    readonly versionOfComponent?: number;
    readonly versionOfPart?: number;
    readonly versionOfPartComponent?: number;
    readonly versionOfVariable?: number;
  };
  readonly " $fragmentType": "ChangeLog_VersionColumn";
}>;
export type ChangeLog_VersionColumn$key = ReadonlyArray<{
  readonly " $data"?: ChangeLog_VersionColumn$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_VersionColumn">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ChangeLog_VersionColumn",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "change",
      "plural": false,
      "selections": [
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

(node as any).hash = "95499e4cb7b8edc2d2984f79195cfdb4";

export default node;
