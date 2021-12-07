/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type EnvironmentsList_EnvironmentEdge = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "EnvironmentsList_EnvironmentEdge";
};
export type EnvironmentsList_EnvironmentEdge$data = EnvironmentsList_EnvironmentEdge;
export type EnvironmentsList_EnvironmentEdge$key = {
    readonly " $data"?: EnvironmentsList_EnvironmentEdge$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EnvironmentsList_EnvironmentEdge">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EnvironmentsList_EnvironmentEdge",
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
    }
  ],
  "type": "Environment",
  "abstractKey": null
};
(node as any).hash = '3e81b41dbdf79c9a9dc6a01be40db8dc';
export default node;
