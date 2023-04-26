/**
 * @generated SignedSource<<273c0e14049caae102e021de2688683a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ApplicationPartSectionHeader$data = {
  readonly id: string;
  readonly name: string;
  readonly ' $fragmentType': 'ApplicationPartSectionHeader';
};
export type ApplicationPartSectionHeader$key = {
  readonly ' $data'?: ApplicationPartSectionHeader$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ApplicationPartSectionHeader'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ApplicationPartSectionHeader',
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
  type: 'Application',
  abstractKey: null,
};

(node as any).hash = '3ae452b8e28fd21bb4a4a05ff98b12ac';

export default node;
