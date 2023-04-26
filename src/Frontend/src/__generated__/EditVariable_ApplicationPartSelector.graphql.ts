/**
 * @generated SignedSource<<76060556cfab70a1c5e3ded0e297d607>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditVariable_ApplicationPartSelector$data = {
  readonly id: string;
  readonly parts: ReadonlyArray<{
    readonly components: ReadonlyArray<{
      readonly definition: {
        readonly name: string;
      } | null;
      readonly id: string;
    }>;
    readonly id: string;
    readonly name: string;
  }>;
  readonly ' $fragmentType': 'EditVariable_ApplicationPartSelector';
};
export type EditVariable_ApplicationPartSelector$key = {
  readonly ' $data'?: EditVariable_ApplicationPartSelector$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditVariable_ApplicationPartSelector'>;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    };
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'EditVariable_ApplicationPartSelector',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'ApplicationPart',
        kind: 'LinkedField',
        name: 'parts',
        plural: true,
        selections: [
          v0 /*: any*/,
          v1 /*: any*/,
          {
            alias: null,
            args: null,
            concreteType: 'ApplicationPartComponent',
            kind: 'LinkedField',
            name: 'components',
            plural: true,
            selections: [
              v0 /*: any*/,
              {
                alias: null,
                args: null,
                concreteType: 'Component',
                kind: 'LinkedField',
                name: 'definition',
                plural: false,
                selections: [v1 /*: any*/],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Application',
    abstractKey: null,
  };
})();

(node as any).hash = 'ec467903e4f4b1d86cee1a75cdbaa31b';

export default node;
