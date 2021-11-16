/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EditApplication_Application_Fragment = {
    readonly id: string;
    readonly name: string;
    readonly namespace: string | null;
    readonly parts: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"EditApplication_part">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"ApplicationPartSectionHeaderFragment">;
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
  "metadata": null,
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApplicationPartSectionHeaderFragment"
    }
  ],
  "type": "Application",
  "abstractKey": null
};
(node as any).hash = 'a4aeb676ddbcf4e92a1c262a3f6bc20a';
export default node;
