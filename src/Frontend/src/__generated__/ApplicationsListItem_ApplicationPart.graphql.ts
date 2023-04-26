/**
 * @generated SignedSource<<c664f38f8aa7e0722d26bdd39defbd0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationsListItem_ApplicationPart$data = {
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
    } | null;
    readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem_Component'>;
  }>;
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentSpreads': FragmentRefs<'AddComponentsToApplicationPartDialog'>;
  readonly ' $fragmentType': 'ApplicationsListItem_ApplicationPart';
};
export type ApplicationsListItem_ApplicationPart$key = {
  readonly ' $data'?: ApplicationsListItem_ApplicationPart$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem_ApplicationPart'>;
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
    name: 'ApplicationsListItem_ApplicationPart',
    selections: [
      v0 /*: any*/,
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'name',
        storageKey: null,
      },
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
            selections: [v0 /*: any*/],
            storageKey: null,
          },
          {
            args: null,
            kind: 'FragmentSpread',
            name: 'ApplicationsListItem_Component',
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

(node as any).hash = 'e71d4286556236402281807d4dc9aefa';

export default node;
