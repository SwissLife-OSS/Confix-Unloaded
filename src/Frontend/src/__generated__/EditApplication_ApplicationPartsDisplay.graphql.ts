/**
 * @generated SignedSource<<5030e8c0265747dd782c7560d95938e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
export type ComponentState = 'ACTIVE' | 'DEPRECATED';
import {FragmentRefs} from 'relay-runtime';
export type EditApplication_ApplicationPartsDisplay$data = {
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
      readonly name: string;
      readonly state: ComponentState;
    } | null;
  }>;
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentSpreads': FragmentRefs<'AddComponentsToApplicationPartDialog'>;
  readonly ' $fragmentType': 'EditApplication_ApplicationPartsDisplay';
};
export type EditApplication_ApplicationPartsDisplay$key = {
  readonly ' $data'?: EditApplication_ApplicationPartsDisplay$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApplication_ApplicationPartsDisplay'>;
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
    name: 'EditApplication_ApplicationPartsDisplay',
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
          {
            alias: null,
            args: null,
            concreteType: 'Component',
            kind: 'LinkedField',
            name: 'definition',
            plural: false,
            selections: [
              v0 /*: any*/,
              v1 /*: any*/,
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'state',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'AddComponentsToApplicationPartDialog',
      },
    ],
    type: 'ApplicationPart',
    abstractKey: null,
  };
})();

(node as any).hash = '1f6f52f67aa32222bdfe12b5056d9447';

export default node;
