/**
 * @generated SignedSource<<735ab60f841ce1bbedf57ee47f5fa6df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplication_Variables$data = {
  readonly variableValues: ReadonlyArray<{
    readonly ' $fragmentSpreads': FragmentRefs<'VariableValueList'>;
  }>;
  readonly ' $fragmentType': 'EditApplication_Variables';
};
export type EditApplication_Variables$key = {
  readonly ' $data'?: EditApplication_Variables$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApplication_Variables'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'EditApplication_Variables',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'VariableValue',
      kind: 'LinkedField',
      name: 'variableValues',
      plural: true,
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'VariableValueList',
        },
      ],
      storageKey: null,
    },
  ],
  type: 'Application',
  abstractKey: null,
};

(node as any).hash = '22457c330eca895ff0ea0a11963bed70';

export default node;
