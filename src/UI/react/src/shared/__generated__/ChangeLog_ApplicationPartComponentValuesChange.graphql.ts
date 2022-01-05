/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ChangeLog_ApplicationPartComponentValuesChange = {
    readonly part: {
        readonly id: string;
    } | null;
    readonly application: {
        readonly id: string;
    } | null;
    readonly partComponent: {
        readonly id: string;
        readonly version: number;
    } | null;
    readonly partComponentVersion: number;
    readonly " $refType": "ChangeLog_ApplicationPartComponentValuesChange";
};
export type ChangeLog_ApplicationPartComponentValuesChange$data = ChangeLog_ApplicationPartComponentValuesChange;
export type ChangeLog_ApplicationPartComponentValuesChange$key = {
    readonly " $data"?: ChangeLog_ApplicationPartComponentValuesChange$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeLog_ApplicationPartComponentValuesChange">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeLog_ApplicationPartComponentValuesChange",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "part",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPartComponent",
      "kind": "LinkedField",
      "name": "partComponent",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "version",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partComponentVersion",
      "storageKey": null
    }
  ],
  "type": "ApplicationPartComponentValuesChange",
  "abstractKey": null
};
})();
(node as any).hash = '3b446df7e46597e8e07e1d7cd8b6d485';
export default node;
