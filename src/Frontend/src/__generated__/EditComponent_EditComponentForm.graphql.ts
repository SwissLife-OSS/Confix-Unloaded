/**
 * @generated SignedSource<<38b2a39084cc8518ef755dc18a67d159>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditComponent_EditComponentForm$data = {
  readonly id: string;
  readonly schemaSdl: any | null;
  readonly values: any | null;
  readonly ' $fragmentType': 'EditComponent_EditComponentForm';
};
export type EditComponent_EditComponentForm$key = {
  readonly ' $data'?: EditComponent_EditComponentForm$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditComponent_EditComponentForm'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditComponent_EditComponentForm',
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
      name: 'schemaSdl',
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'values',
      storageKey: null,
    },
  ],
  type: 'Component',
  abstractKey: null,
};

(node as any).hash = '0b0092627d346adac8a1e7c0d0dd4b91';

export default node;
