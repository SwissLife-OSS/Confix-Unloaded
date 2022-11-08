/**
 * @generated SignedSource<<49088b0b9ef1777d672e567d453c09dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EditApplicationPartComponent_fragment$data = {
  readonly applicationPart: {
    readonly application: {
      readonly name: string;
      readonly namespace: string;
      readonly variableValues: ReadonlyArray<{
        readonly variable: {
          readonly name: string;
        } | null;
      }>;
    } | null;
    readonly name: string;
    readonly variableValues: ReadonlyArray<{
      readonly variable: {
        readonly name: string;
      } | null;
    }>;
  } | null;
  readonly definition: {
    readonly defaults: any | null;
    readonly id: string;
    readonly name: string;
    readonly schema: any | null;
    readonly schemaSdl: any | null;
    readonly schemaViolations: ReadonlyArray<{
      readonly code: string;
      readonly path: any;
    }>;
    readonly state: ComponentState;
    readonly values: any | null;
  } | null;
  readonly values: string | null;
  readonly version: number;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_ChangeLog_Fragment">;
  readonly " $fragmentType": "EditApplicationPartComponent_fragment";
};
export type EditApplicationPartComponent_fragment$key = {
  readonly " $data"?: EditApplicationPartComponent_fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditApplicationPartComponent_fragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "VariableValue",
  "kind": "LinkedField",
  "name": "variableValues",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Variable",
      "kind": "LinkedField",
      "name": "variable",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "values",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditApplicationPartComponent_fragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ApplicationPart",
      "kind": "LinkedField",
      "name": "applicationPart",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Component",
      "kind": "LinkedField",
      "name": "definition",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v0/*: any*/),
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
          "kind": "ScalarField",
          "name": "schemaSdl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "schema",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "defaults",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SchemaViolation",
          "kind": "LinkedField",
          "name": "schemaViolations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "path",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "code",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "version",
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EditApplicationPartComponent_ChangeLog_Fragment"
        }
      ]
    }
  ],
  "type": "ApplicationPartComponent",
  "abstractKey": null
};
})();

(node as any).hash = "f00b4d66d4ba8893c488a8a8c455a56b";

export default node;
