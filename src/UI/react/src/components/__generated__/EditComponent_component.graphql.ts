/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ComponentState = "ACTIVE" | "DEPRECATED" | "%future added value";
export type EditComponent_component = {
    readonly id: string;
    readonly name: string;
    readonly state: ComponentState;
    readonly schemaSdl: string | null;
    readonly schema: object | null;
    readonly values: object | null;
    readonly defaults: object | null;
    readonly schemaViolations: ReadonlyArray<{
        readonly path: object;
        readonly code: string;
    }>;
    readonly changeLog: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ChangeLog_fragment">;
    }>;
    readonly " $refType": "EditComponent_component";
};
export type EditComponent_component$data = EditComponent_component;
export type EditComponent_component$key = {
    readonly " $data"?: EditComponent_component$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"EditComponent_component">;
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
(node as any).hash = '0bc4b461c49a6c830c8ccbdaa2e19b9f';
export default node;
