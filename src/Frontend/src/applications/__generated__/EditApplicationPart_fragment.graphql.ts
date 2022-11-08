/**
 * @generated SignedSource<<fcfdc79a194fbfe9d2a1628b0a4e16b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPart_fragment$data = {
  readonly application: {
    readonly id: string;
    readonly name: string;
    readonly namespace: string;
  } | null;
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
    } | null;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartComponents_component">;
  }>;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ApplicationPartChangeLog_ChangeLog_Fragment" | "EditApplicationPart_DeployedEnvironment_Fragment" | "EditApplicationPart_VariableValues_Fragment" | "PublishedApplicationPartsFragment">;
  readonly " $fragmentType": "EditApplicationPart_fragment";
};
export type EditApplicationPart_fragment$key = {
  readonly " $data"?: EditApplicationPart_fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPart_fragment">;
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
      "operation": require('./EditApplicationPartRefetchPartQuery.graphql'),
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

(node as any).hash = "c8f759aa76978deb8c028ee4e3bc12e7";

export default node;
