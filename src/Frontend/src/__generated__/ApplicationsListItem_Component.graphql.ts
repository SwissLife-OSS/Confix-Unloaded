/**
 * @generated SignedSource<<e8b20d791aa29e58af7c4e9b11b068b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationsListItem_Component$data = {
  readonly definition: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly id: string;
  readonly ' $fragmentType': 'ApplicationsListItem_Component';
};
export type ApplicationsListItem_Component$key = {
  readonly ' $data'?: ApplicationsListItem_Component$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem_Component'>;
};

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: 'ScalarField',
    name: 'id',
    storageKey: null,
  };
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'ApplicationsListItem_Component',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'name',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'ApplicationPartComponent',
    abstractKey: null,
  };
})();

(node as any).hash = '53730d6a25e65ba08096f45c6472d7a2';

export default node;
