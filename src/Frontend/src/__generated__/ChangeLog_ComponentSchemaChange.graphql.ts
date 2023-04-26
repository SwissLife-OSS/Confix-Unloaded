/**
 * @generated SignedSource<<6399f797bac362ff0696d190a90e4d00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ChangeLog_ComponentSchemaChange$data = {
  readonly kind: string;
  readonly ' $fragmentType': 'ChangeLog_ComponentSchemaChange';
};
export type ChangeLog_ComponentSchemaChange$key = {
  readonly ' $data'?: ChangeLog_ComponentSchemaChange$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog_ComponentSchemaChange'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ChangeLog_ComponentSchemaChange',
  selections: [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'kind',
      storageKey: null,
    },
  ],
  type: 'ComponentSchemaChange',
  abstractKey: null,
};

(node as any).hash = 'ef4a2cfcb88c8903d6734a7ed51fa995';

export default node;
