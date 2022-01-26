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
        readonly " $fragmentRefs": FragmentRefs<"ApplicationPartComponents_component">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"EditApplicationPart_VariableValues_Fragment" | "ApplicationPartChangeLog_ChangeLog_Fragment" | "EditApplicationPart_DeployedEnvironment_Fragment" | "PublishedApplicationPartsFragment">;
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
          "name": "ApplicationPartComponents_component"
        }
      ],
      "storageKey": null
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPart_VariableValues_Fragment"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ApplicationPartChangeLog_ChangeLog_Fragment"
        }
      ]
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPart_DeployedEnvironment_Fragment"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PublishedApplicationPartsFragment"
    }
  ],
  "type": "ApplicationPart",
  "abstractKey": null
};
})();
(node as any).hash = 'c8f759aa76978deb8c028ee4e3bc12e7';
export default node;
