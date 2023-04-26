/**
 * @generated SignedSource<<4259367aa23146bedfa315633f6a2503>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ChangeLog_AddComponentToApplicationPartChange$data = {
  readonly addedComponent: {
    readonly definition: {
      readonly name: string;
    } | null;
  };
  readonly ' $fragmentType': 'ChangeLog_AddComponentToApplicationPartChange';
};
export type ChangeLog_AddComponentToApplicationPartChange$key = {
  readonly ' $data'?: ChangeLog_AddComponentToApplicationPartChange$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ChangeLog_AddComponentToApplicationPartChange'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'ChangeLog_AddComponentToApplicationPartChange',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'ApplicationPartComponent',
      kind: 'LinkedField',
      name: 'addedComponent',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'Component',
          kind: 'LinkedField',
          name: 'definition',
          plural: false,
          selections: [
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
      storageKey: null,
    },
  ],
  type: 'AddComponentToApplicationPartChange',
  abstractKey: null,
};

(node as any).hash = '18b22fd9090cb7fe33d80fa2368876ac';

export default node;
