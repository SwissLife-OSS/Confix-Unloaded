/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_ComponentSchemaChange = {
    readonly kind: string;
    readonly " $refType": "ChangeLog_ComponentSchemaChange";
};
export type ChangeLog_ComponentSchemaChange$data = ChangeLog_ComponentSchemaChange;
export type ChangeLog_ComponentSchemaChange$key = {
    readonly " $data"?: ChangeLog_ComponentSchemaChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_ComponentSchemaChange">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_ComponentSchemaChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kind",
      "storageKey": null
    }
  ],
  "type": "ComponentSchemaChange",
  "abstractKey": null
};
(node as any).hash = 'ef4a2cfcb88c8903d6734a7ed51fa995';
export default node;
