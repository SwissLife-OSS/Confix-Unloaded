/**
 * @generated SignedSource<<9306b1d736f03366689fb4072f2681cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type VariableState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EditVariable_Variable$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog">;
  }>;
  readonly id: string;
  readonly isSecret: boolean;
  readonly name: string;
  readonly namespace: string;
  readonly state: VariableState;
  readonly values: ReadonlyArray<{
    readonly application: {
      readonly id: string;
    } | null;
    readonly applicationPart: {
      readonly id: string;
    } | null;
    readonly id: string;
    readonly value: string | null;
  }>;
  readonly " $fragmentType": "EditVariable_Variable";
};
export type EditVariable_Variable$key = {
  readonly " $data"?: EditVariable_Variable$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditVariable_Variable">;
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
  "name": "EditVariable_Variable",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "isSecret",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VariableValue",
      "kind": "LinkedField",
      "name": "values",
      "plural": true,
      "selections": [
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
          "concreteType": "ApplicationPart",
          "kind": "LinkedField",
          "name": "applicationPart",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ChangeLog",
      "kind": "LinkedField",
      "name": "changeLog",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChangeLog"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Variable",
  "abstractKey": null
};
})();

(node as any).hash = "27ad8bf47cc0233d5a6b69c9c0b6c11f";

export default node;
