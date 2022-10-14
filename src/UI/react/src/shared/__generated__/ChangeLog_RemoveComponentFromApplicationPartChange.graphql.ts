/**
 * @generated SignedSource<<e2d86424df889ad083337b4e94d5f526>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_RemoveComponentFromApplicationPartChange$data = {
  readonly removedComponent: {
    readonly definition: {
      readonly name: string;
    };
  };
  readonly " $fragmentType": "ChangeLog_RemoveComponentFromApplicationPartChange";
};
export type ChangeLog_RemoveComponentFromApplicationPartChange$key = {
  readonly " $data"?: ChangeLog_RemoveComponentFromApplicationPartChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_RemoveComponentFromApplicationPartChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_RemoveComponentFromApplicationPartChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPartComponent",
      "kind": "LinkedField",
      "name": "removedComponent",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Component",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RemoveComponentFromApplicationPartChange",
  "abstractKey": null
};

(node as any).hash = "28247d7ea5a63136c23c265a9352c1ee";

export default node;
