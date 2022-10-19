/**
 * @generated SignedSource<<5863afa048841cc2767a62d754a5c37e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EditComponent_component$data = {
  readonly changeLog: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeLog_fragment">;
  }>;
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
  readonly " $fragmentType": "EditComponent_component";
};
export type EditComponent_component$key = {
  readonly " $data"?: EditComponent_component$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_component">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditComponent_component",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "values",
      "storageKey": null
    },
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
          "name": "ChangeLog_fragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Component",
  "abstractKey": null
};

(node as any).hash = "0bc4b461c49a6c830c8ccbdaa2e19b9f";

export default node;