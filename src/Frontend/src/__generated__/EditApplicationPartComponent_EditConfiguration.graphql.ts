/**
 * @generated SignedSource<<ab3a499c686eff96279e25df6aec47b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplicationPartComponent_EditConfiguration$data = {
  readonly applicationPartComponentById: {
    readonly applicationPart: {
      readonly application: {
        readonly variableValues: ReadonlyArray<{
          readonly variable: {
            readonly name: string;
          } | null;
        }>;
      } | null;
      readonly variableValues: ReadonlyArray<{
        readonly variable: {
          readonly name: string;
        } | null;
      }>;
    } | null;
    readonly definition: {
      readonly id: string;
      readonly schemaSdl: any | null;
    } | null;
    readonly values: string | null;
  } | null;
  readonly globalVariableValues: ReadonlyArray<{
    readonly variable: {
      readonly name: string;
    } | null;
  }>;
  readonly ' $fragmentType': 'EditApplicationPartComponent_EditConfiguration';
};
export type EditApplicationPartComponent_EditConfiguration$key = {
  readonly ' $data'?: EditApplicationPartComponent_EditConfiguration$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditApplicationPartComponent_EditConfiguration'>;
};

const node: ReaderFragment = (function () {
  var v0 = [
      {
        alias: null,
        args: null,
        concreteType: 'Variable',
        kind: 'LinkedField',
        name: 'variable',
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
    v1 = {
      alias: null,
      args: null,
      concreteType: 'VariableValue',
      kind: 'LinkedField',
      name: 'variableValues',
      plural: true,
      selections: v0 /*: any*/,
      storageKey: null,
    };
  return {
    argumentDefinitions: [
      {
        kind: 'RootArgument',
        name: 'partComponentId',
      },
    ],
    kind: 'Fragment',
    metadata: null,
    name: 'EditApplicationPartComponent_EditConfiguration',
    selections: [
      {
        alias: null,
        args: [
          {
            kind: 'Variable',
            name: 'partComponentId',
            variableName: 'partComponentId',
          },
        ],
        concreteType: 'ApplicationPartComponent',
        kind: 'LinkedField',
        name: 'applicationPartComponentById',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ApplicationPart',
            kind: 'LinkedField',
            name: 'applicationPart',
            plural: false,
            selections: [
              v1 /*: any*/,
              {
                alias: null,
                args: null,
                concreteType: 'Application',
                kind: 'LinkedField',
                name: 'application',
                plural: false,
                selections: [v1 /*: any*/],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'values',
            storageKey: null,
          },
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
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'VariableValue',
        kind: 'LinkedField',
        name: 'globalVariableValues',
        plural: true,
        selections: v0 /*: any*/,
        storageKey: null,
      },
    ],
    type: 'Query',
    abstractKey: null,
  };
})();

(node as any).hash = '496f9c48eaa3aecd937616a722166d1d';

export default node;
