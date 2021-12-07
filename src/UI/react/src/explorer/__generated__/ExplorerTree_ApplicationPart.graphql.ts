/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ExplorerTree_ApplicationPart = {
    readonly id: string;
    readonly name: string;
    readonly variableValues: ReadonlyArray<{
        readonly id: string;
        readonly environment: {
            readonly id: string;
            readonly name: string;
        } | null;
        readonly variable: {
            readonly id: string;
            readonly name: string;
        } | null;
    }>;
    readonly components: ReadonlyArray<{
        readonly id: string;
        readonly definition: {
            readonly id: string;
            readonly name: string;
        };
    }>;
    readonly " $refType": "ExplorerTree_ApplicationPart";
};
export type ExplorerTree_ApplicationPart$data = ExplorerTree_ApplicationPart;
export type ExplorerTree_ApplicationPart$key = {
    readonly " $data"?: ExplorerTree_ApplicationPart$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ExplorerTree_ApplicationPart">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExplorerTree_ApplicationPart",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "variableValues",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Environment",
          "kind": "LinkedField",
          "name": "environment",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Variable",
          "kind": "LinkedField",
          "name": "variable",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPartComponent",
      "kind": "LinkedField",
      "name": "components",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Component",
          "kind": "LinkedField",
          "name": "definition",
          "plural": false,
          "selections": (v2/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();
(node as any).hash = 'd1c5efc303a0612f1e8111c2c1497942';
export default node;
