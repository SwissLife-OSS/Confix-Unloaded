/**
 * @generated SignedSource<<672b628050293bdcc3c228310acc2187>>
 * @relayHash 1c3364ec449f0ec3ddb7fe2b2843eaf8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1c3364ec449f0ec3ddb7fe2b2843eaf8

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplication_RefetchQuery$variables = {
  id: string;
};
export type EditApplication_RefetchQuery$data = {
  readonly node: {
    readonly ' $fragmentSpreads': FragmentRefs<'EditApplication'>;
  } | null;
};
export type EditApplication_RefetchQuery = {
  response: EditApplication_RefetchQuery$data;
  variables: EditApplication_RefetchQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'id',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'id',
        variableName: 'id',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'namespace',
      storageKey: null,
    },
    v6 = [v3 /*: any*/, v4 /*: any*/],
    v7 = [v4 /*: any*/],
    v8 = [v4 /*: any*/, v3 /*: any*/],
    v9 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: v8 /*: any*/,
        storageKey: null,
      },
      v3 /*: any*/,
    ],
    v10 = [v3 /*: any*/],
    v11 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v8 /*: any*/,
        storageKey: null,
      },
    ],
    v12 = [
      {
        alias: null,
        args: null,
        concreteType: 'Variable',
        kind: 'LinkedField',
        name: 'variable',
        plural: false,
        selections: v8 /*: any*/,
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditApplication_RefetchQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'EditApplication',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditApplication_RefetchQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: null,
          kind: 'LinkedField',
          name: 'node',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              kind: 'InlineFragment',
              selections: [
                v4 /*: any*/,
                v5 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'ApplicationPart',
                  kind: 'LinkedField',
                  name: 'parts',
                  plural: true,
                  selections: [
                    v3 /*: any*/,
                    v4 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ApplicationPartComponent',
                      kind: 'LinkedField',
                      name: 'components',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Component',
                          kind: 'LinkedField',
                          name: 'definition',
                          plural: false,
                          selections: [
                            v3 /*: any*/,
                            v4 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'state',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        v3 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Application',
                      kind: 'LinkedField',
                      name: 'application',
                      plural: false,
                      selections: [v3 /*: any*/, v5 /*: any*/],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
                {
                  if: null,
                  kind: 'Defer',
                  label: 'EditApplication$defer$EditApplication_Variables',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'VariableValue',
                      kind: 'LinkedField',
                      name: 'variableValues',
                      plural: true,
                      selections: [
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Environment',
                          kind: 'LinkedField',
                          name: 'environment',
                          plural: false,
                          selections: v6 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Variable',
                          kind: 'LinkedField',
                          name: 'variable',
                          plural: false,
                          selections: v6 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'value',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                },
                {
                  if: null,
                  kind: 'Defer',
                  label:
                    'EditApplication$defer$EditApplication_ApplicationChangeLog',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ChangeLog',
                      kind: 'LinkedField',
                      name: 'changeLog',
                      plural: true,
                      selections: [
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'modifiedAt',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'UserInfo',
                          kind: 'LinkedField',
                          name: 'modifiedBy',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'email',
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: null,
                          kind: 'LinkedField',
                          name: 'change',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'kind',
                              storageKey: null,
                            },
                            v2 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: v7 /*: any*/,
                              type: 'RenameApplicationChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v7 /*: any*/,
                              type: 'RenameApplicationPartChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'addedComponent',
                                  plural: false,
                                  selections: v9 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              type: 'AddComponentToApplicationPartChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPart',
                                  kind: 'LinkedField',
                                  name: 'addedPart',
                                  plural: false,
                                  selections: v8 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              type: 'AddPartToApplicationChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'removedComponent',
                                  plural: false,
                                  selections: v9 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              type: 'RemoveComponentFromApplicationPartChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPart',
                                  kind: 'LinkedField',
                                  name: 'removedPart',
                                  plural: false,
                                  selections: v8 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              type: 'RemovePartFromApplicationChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPart',
                                  kind: 'LinkedField',
                                  name: 'part',
                                  plural: false,
                                  selections: v10 /*: any*/,
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'Application',
                                  kind: 'LinkedField',
                                  name: 'application',
                                  plural: false,
                                  selections: v10 /*: any*/,
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'partComponent',
                                  plural: false,
                                  selections: [
                                    v3 /*: any*/,
                                    {
                                      alias: null,
                                      args: null,
                                      kind: 'ScalarField',
                                      name: 'version',
                                      storageKey: null,
                                    },
                                  ],
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'partComponentVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'ApplicationPartComponentValuesChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v11 /*: any*/,
                              type: 'CreateComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v11 /*: any*/,
                              type: 'RemoveComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v11 /*: any*/,
                              type: 'RenameComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v12 /*: any*/,
                              type: 'CreateVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v12 /*: any*/,
                              type: 'DeleteVariableValueChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v12 /*: any*/,
                              type: 'RenameVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v12 /*: any*/,
                              type: 'VariableValueChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'partVersion',
                                  storageKey: null,
                                },
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPart',
                                  kind: 'LinkedField',
                                  name: 'part',
                                  plural: false,
                                  selections: v8 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              type: 'PublishedApplicationPartChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: 'versionOfApp',
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'applicationVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'ApplicationChange',
                              abstractKey: '__isApplicationChange',
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: 'versionOfPart',
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'partVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'ApplicationPartChange',
                              abstractKey: '__isApplicationPartChange',
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: 'versionOfPartComponent',
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'partComponentVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'ApplicationPartComponentChange',
                              abstractKey: '__isApplicationPartComponentChange',
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: 'versionOfComponent',
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'componentVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'ComponentChange',
                              abstractKey: '__isComponentChange',
                            },
                            {
                              kind: 'InlineFragment',
                              selections: [
                                {
                                  alias: 'versionOfVariable',
                                  args: null,
                                  kind: 'ScalarField',
                                  name: 'variableVersion',
                                  storageKey: null,
                                },
                              ],
                              type: 'VariableChange',
                              abstractKey: '__isVariableChange',
                            },
                          ],
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                },
              ],
              type: 'Application',
              abstractKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: '1c3364ec449f0ec3ddb7fe2b2843eaf8',
      metadata: {},
      name: 'EditApplication_RefetchQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '41d397e36ce74443b51b127622c28ef0';

export default node;
