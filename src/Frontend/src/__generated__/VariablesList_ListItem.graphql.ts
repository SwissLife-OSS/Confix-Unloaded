/**
 * @generated SignedSource<<bc5a59150f8fc79c0e99bf257b2b9184>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type VariablesList_ListItem$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'VariablesList_ListItem';
};
export type VariablesList_ListItem$key = {
  readonly ' $data'?: VariablesList_ListItem$data;
  readonly ' $fragmentSpreads': FragmentRefs<'VariablesList_ListItem'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'VariablesList_ListItem',
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
  type: 'Variable',
  abstractKey: null,
};

(node as any).hash = '2b6add3fc7206ac24a4ef081a186d579';

export default node;
