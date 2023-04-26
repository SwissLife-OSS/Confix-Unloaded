/**
 * @generated SignedSource<<6abc5d4126597693ad9cb466e1dfc3a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditEnvironment_ParentEnvironement$data = {
  readonly id: string;
  readonly name: string;
  readonly parent: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly ' $fragmentType': 'EditEnvironment_ParentEnvironement';
};
export type EditEnvironment_ParentEnvironement$key = {
  readonly ' $data'?: EditEnvironment_ParentEnvironement$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditEnvironment_ParentEnvironement'>;
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
    name: 'EditEnvironment_ParentEnvironement',
    selections: [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'Environment',
        kind: 'LinkedField',
        name: 'parent',
        plural: false,
        selections: [v0 /*: any*/, v1 /*: any*/],
        storageKey: null,
      },
    ],
    type: 'Environment',
    abstractKey: null,
  };
})();

(node as any).hash = '518215ed345e248ce33f2a7946e9464f';

export default node;
