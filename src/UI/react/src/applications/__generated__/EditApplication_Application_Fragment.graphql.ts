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
    readonly variableValues: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"VariableValueList_values">;
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
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "variableValues",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "VariableValueList_values"
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
(node as any).hash = 'c74541fbb2578d5babd1b6abe2cf2798';
export default node;
