/**
 * @generated SignedSource<<261f839968a405f6e09d120558287c4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EnvironmentsList_EnvironmentListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'EnvironmentsList_EnvironmentListItem';
};
export type EnvironmentsList_EnvironmentListItem$key = {
  readonly ' $data'?: EnvironmentsList_EnvironmentListItem$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EnvironmentsList_EnvironmentListItem'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EnvironmentsList_EnvironmentListItem',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
  ],
  type: 'Environment',
  abstractKey: null,
};

(node as any).hash = 'a443dfa93b71c04b7b65c72c97fd6441';

export default node;
