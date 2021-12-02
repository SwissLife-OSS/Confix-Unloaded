/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import EditApplicationPartRefetchPartQuery from "./EditApplicationPartRefetchPartQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_fragment = {
    readonly id: string;
    readonly name: string;
    readonly application: {
        readonly id: string;
        readonly namespace: string | null;
        readonly name: string;
    } | null;
    readonly components: ReadonlyArray<{
        readonly id: string;
        readonly definition: {
            readonly id: string;
        };
        readonly " $fragmentRefs": FragmentRefs<"EditApplicationPartComponent_component">;
    }>;
    readonly variableValues: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"VariableValueList_values">;
    }>;
    readonly " $refType": "EditApplicationPart_fragment";
};
export type EditApplicationPart_fragment$data = EditApplicationPart_fragment;
export type EditApplicationPart_fragment$key = {
    readonly " $data"?: EditApplicationPart_fragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_fragment">;
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": EditApplicationPartRefetchPartQuery,
      "identifierField": "id"
    }
  },
  "name": "EditApplicationPart_fragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Application",
      "kind": "LinkedField",
      "name": "application",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "namespace",
          "storageKey": null
        },
        (v1/*: any*/)
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
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPartComponent_component"
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
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();
(node as any).hash = 'd323e5f54e6357ee7f9923aca22b7b89';
export default node;
