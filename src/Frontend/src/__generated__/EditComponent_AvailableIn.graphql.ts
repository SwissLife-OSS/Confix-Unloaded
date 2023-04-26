/**
 * @generated SignedSource<<cef6802e1fc06142a6bc6a7fe0eafa63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import {Fragment, ReaderFragment} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditComponent_AvailableIn$data = {
  readonly scopes: ReadonlyArray<{
    readonly application: {
      readonly name: string;
    } | null;
    readonly applicationId: string | null;
    readonly applicationPart: {
      readonly name: string;
    } | null;
    readonly applicationPartId: string | null;
    readonly namespace: string;
  }>;
  readonly ' $fragmentType': 'EditComponent_AvailableIn';
};
export type EditComponent_AvailableIn$key = {
  readonly ' $data'?: EditComponent_AvailableIn$data;
  readonly ' $fragmentSpreads': FragmentRefs<'EditComponent_AvailableIn'>;
};

const node: ReaderFragment = (function () {
  var v0 = [
    {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
  ];
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'EditComponent_AvailableIn',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'ComponentScope',
        kind: 'LinkedField',
        name: 'scopes',
        plural: true,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'namespace',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'applicationId',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'Application',
            kind: 'LinkedField',
            name: 'application',
            plural: false,
            selections: v0 /*: any*/,
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'applicationPartId',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'ApplicationPart',
            kind: 'LinkedField',
            name: 'applicationPart',
            plural: false,
            selections: v0 /*: any*/,
            storageKey: null,
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Component',
    abstractKey: null,
  };
})();

(node as any).hash = '58dd3744ca8d22db7ecc2c56daf2f328';

export default node;
