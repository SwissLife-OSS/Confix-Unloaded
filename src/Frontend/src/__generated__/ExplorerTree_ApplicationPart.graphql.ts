/**
 * @generated SignedSource<<e12a20c71ff81c4fada14e96272d1370>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type ExplorerTree_ApplicationPart$data = {
  readonly components: ReadonlyArray<{
    readonly definition: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly id: string;
  }>;
  readonly id: string;
  readonly name: string;
  readonly variableValues: ReadonlyArray<{
    readonly environment: {
      readonly id: string;
      readonly name: string;
    } | null;
    readonly id: string;
    readonly variable: {
      readonly id: string;
      readonly name: string;
    } | null;
  }>;
  readonly ' $fragmentType': 'ExplorerTree_ApplicationPart';
};
export type ExplorerTree_ApplicationPart$key = {
  readonly ' $data'?: ExplorerTree_ApplicationPart$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ExplorerTree_ApplicationPart'>;
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
    },
    v2 = [v0 /*: any*/, v1 /*: any*/];
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'ExplorerTree_ApplicationPart',
    selections: [
      v0 /*: any*/,
      v1 /*: any*/,
      {
        alias: null,
        args: null,
        concreteType: 'VariableValue',
        kind: 'LinkedField',
        name: 'variableValues',
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            concreteType: 'Environment',
            kind: 'LinkedField',
            name: 'environment',
            plural: false,
            selections: v2 /*: any*/,
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Variable',
            kind: 'LinkedField',
            name: 'variable',
            plural: false,
            selections: v2 /*: any*/,
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'ApplicationPartComponent',
        kind: 'LinkedField',
        name: 'components',
        plural: true,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            concreteType: 'Component',
            kind: 'LinkedField',
            name: 'definition',
            plural: false,
            selections: v2 /*: any*/,
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'ApplicationPart',
    abstractKey: null,
  };
})();

(node as any).hash = 'd1c5efc303a0612f1e8111c2c1497942';

export default node;
