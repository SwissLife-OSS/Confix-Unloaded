/**
 * @generated SignedSource<<6949289abe97ebbd1bcf57a337057aa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeLog_AddPartToApplicationChange$data = {
  readonly addedPart: {
    readonly name: string;
  };
  readonly " $fragmentType": "ChangeLog_AddPartToApplicationChange";
};
export type ChangeLog_AddPartToApplicationChange$key = {
  readonly " $data"?: ChangeLog_AddPartToApplicationChange$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_AddPartToApplicationChange">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_AddPartToApplicationChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "addedPart",
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
  "type": "AddPartToApplicationChange",
  "abstractKey": null
};

(node as any).hash = "b9346431a6f714731a17665acb87adc1";

export default node;
