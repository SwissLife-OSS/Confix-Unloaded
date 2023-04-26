/**
 * @generated SignedSource<<299231ff39c8a048e3f700a10f89925f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationsListItem_SelectedListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly namespace: string;
  readonly parts: ReadonlyArray<{
    readonly id: string;
    readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem_ApplicationPart'>;
  }>;
  readonly ' $fragmentType': 'ApplicationsListItem_SelectedListItem';
};
export type ApplicationsListItem_SelectedListItem$key = {
  readonly ' $data'?: ApplicationsListItem_SelectedListItem$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem_SelectedListItem'>;
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
    name: 'ApplicationsListItem_SelectedListItem',
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
        kind: 'ScalarField',
        name: 'namespace',
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'ApplicationPart',
        kind: 'LinkedField',
        name: 'parts',
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            args: null,
            kind: 'FragmentSpread',
            name: 'ApplicationsListItem_ApplicationPart',
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Application',
    abstractKey: null,
  };
})();

(node as any).hash = '2b8f16b21adf9e19b0b1f77f306b17f6';

export default node;
