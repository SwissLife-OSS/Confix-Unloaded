/**
 * @generated SignedSource<<5e0bb7272284295387379888759587cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApiKey_Form$data = {
  readonly ' $fragmentSpreads': FragmentRefs<
    'EditApiKey_Header' | 'EditApiKey_RoleScopeSection'
  >;
  readonly ' $fragmentType': 'EditApiKey_Form';
};
export type EditApiKey_Form$key = {
  readonly ' $data'?: EditApiKey_Form$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApiKey_Form'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditApiKey_Form',
  selections: [
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'EditApiKey_RoleScopeSection',
    },
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'EditApiKey_Header',
    },
  ],
  type: 'ApiKey',
  abstractKey: null,
};

(node as any).hash = 'fd35483bad123f5e11914c9926746d74';

export default node;
