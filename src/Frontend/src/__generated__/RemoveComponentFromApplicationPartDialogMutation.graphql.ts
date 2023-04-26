/**
 * @generated SignedSource<<d3cce1858b443d11924f17d377f25761>>
 * @relayHash a66a54484e6c58a43cc8440b70b11e94
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a66a54484e6c58a43cc8440b70b11e94

import {ConcreteRequest, Mutation} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type RemoveComponentFromApplicationPartInput = {
  partComponentId: string;
};
export type RemoveComponentFromApplicationPartDialogMutation$variables = {
  input: RemoveComponentFromApplicationPartInput;
};
export type RemoveComponentFromApplicationPartDialogMutation$data = {
  readonly removeComponentFromApplicationPart: {
    readonly applicationPart: {
      readonly id: string;
      readonly ' $fragmentSpreads': FragmentRefs<'EditApplicationPart'>;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type RemoveComponentFromApplicationPartDialogMutation = {
  response: RemoveComponentFromApplicationPartDialogMutation$data;
  variables: RemoveComponentFromApplicationPartDialogMutation$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'input',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'input',
        variableName: 'input',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      concreteType: null,
      kind: 'LinkedField',
      name: 'errors',
      plural: true,
      selections: [
        v3 /*: any*/,
        {
          kind: 'InlineFragment',
          selections: [
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'message',
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'code',
              storageKey: null,
            },
          ],
          type: 'UserError',
          abstractKey: '__isUserError',
        },
      ],
      storageKey: null,
    },
    v5 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v6 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ],
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'publishedAt',
      storageKey: null,
    },
    v8 = [v5 /*: any*/, v2 /*: any*/],
    v9 = {
      alias: null,
      args: null,
      concreteType: 'ApplicationPart',
      kind: 'LinkedField',
      name: 'part',
      plural: false,
      selections: v8 /*: any*/,
      storageKey: null,
    },
    v10 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'email',
        storageKey: null,
      },
    ],
    v11 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'version',
      storageKey: null,
    },
    v12 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'tag',
      storageKey: null,
    },
    v13 = {
      alias: null,
      args: null,
      concreteType: 'Environment',
      kind: 'LinkedField',
      name: 'environment',
      plural: false,
      selections: v8 /*: any*/,
      storageKey: null,
    },
    v14 = [v2 /*: any*/],
    v15 = {
      alias: null,
      args: null,
      concreteType: 'Application',
      kind: 'LinkedField',
      name: 'application',
      plural: false,
      selections: v14 /*: any*/,
      storageKey: null,
    },
    v16 = [v2 /*: any*/, v5 /*: any*/],
    v17 = [v5 /*: any*/],
    v18 = [
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
      v2 /*: any*/,
    ],
    v19 = [
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
    v20 = [
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
      name: 'RemoveComponentFromApplicationPartDialogMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'RemoveComponentFromApplicationPartPayload',
          kind: 'LinkedField',
          name: 'removeComponentFromApplicationPart',
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
                v2 /*: any*/,
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'EditApplicationPart',
                },
              ],
              storageKey: null,
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
      type: 'Mutation',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RemoveComponentFromApplicationPartDialogMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'RemoveComponentFromApplicationPartPayload',
          kind: 'LinkedField',
          name: 'removeComponentFromApplicationPart',
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
                v2 /*: any*/,
                v5 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Application',
                  kind: 'LinkedField',
                  name: 'application',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'namespace',
                      storageKey: null,
                    },
                    v5 /*: any*/,
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
                    v2 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Component',
                      kind: 'LinkedField',
                      name: 'definition',
                      plural: false,
                      selections: [
                        v2 /*: any*/,
                        v5 /*: any*/,
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
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v6 /*: any*/,
                  concreteType: 'PublishedVersionsConnection',
                  kind: 'LinkedField',
                  name: 'publishedVersions',
                  plural: false,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'PublishedVersionsEdge',
                      kind: 'LinkedField',
                      name: 'edges',
                      plural: true,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'PublishedApplicationPart',
                          kind: 'LinkedField',
                          name: 'node',
                          plural: false,
                          selections: [
                            v2 /*: any*/,
                            v7 /*: any*/,
                            v9 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: 'UserInfo',
                              kind: 'LinkedField',
                              name: 'publishedBy',
                              plural: false,
                              selections: v10 /*: any*/,
                              storageKey: null,
                            },
                            v11 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: 'ClaimedVersion',
                              kind: 'LinkedField',
                              name: 'claimsVersions',
                              plural: true,
                              selections: [
                                v12 /*: any*/,
                                v13 /*: any*/,
                                v2 /*: any*/,
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
                          kind: 'ScalarField',
                          name: 'cursor',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'PageInfo',
                      kind: 'LinkedField',
                      name: 'pageInfo',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'endCursor',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'hasNextPage',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: 'publishedVersions(first:20)',
                },
                {
                  alias: null,
                  args: v6 /*: any*/,
                  filters: null,
                  handle: 'connection',
                  key: 'part_publishedVersions',
                  kind: 'LinkedHandle',
                  name: 'publishedVersions',
                },
                {
                  if: null,
                  kind: 'Defer',
                  label:
                    'EditApplicationPart$defer$EditApplicationPart_Variable',
                  selections: [
                    v2 /*: any*/,
                    v15 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'VariableValue',
                      kind: 'LinkedField',
                      name: 'variableValues',
                      plural: true,
                      selections: [
                        v2 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Environment',
                          kind: 'LinkedField',
                          name: 'environment',
                          plural: false,
                          selections: v16 /*: any*/,
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Variable',
                          kind: 'LinkedField',
                          name: 'variable',
                          plural: false,
                          selections: v16 /*: any*/,
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
                  label: 'EditApplicationPart$defer$ApplicationPartChangeLog',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ChangeLog',
                      kind: 'LinkedField',
                      name: 'changeLog',
                      plural: true,
                      selections: [
                        v2 /*: any*/,
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
                          selections: v10 /*: any*/,
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
                            v3 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: v17 /*: any*/,
                              type: 'RenameApplicationChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v17 /*: any*/,
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
                                  selections: v18 /*: any*/,
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
                                  selections: v18 /*: any*/,
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
                                  selections: v14 /*: any*/,
                                  storageKey: null,
                                },
                                v15 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'partComponent',
                                  plural: false,
                                  selections: [v2 /*: any*/, v11 /*: any*/],
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
                              selections: v19 /*: any*/,
                              type: 'CreateComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v19 /*: any*/,
                              type: 'RemoveComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v19 /*: any*/,
                              type: 'RenameComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
                              type: 'CreateVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
                              type: 'DeleteVariableValueChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
                              type: 'RenameVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
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
                                v9 /*: any*/,
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
                {
                  if: null,
                  kind: 'Defer',
                  label:
                    'EditApplicationPart$defer$EditApplicationPart_DeployedEnvironments',
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'DeploymentsConnection',
                      kind: 'LinkedField',
                      name: 'deployments',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          concreteType: 'DeployedEnvironment',
                          kind: 'LinkedField',
                          name: 'nodes',
                          plural: true,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              concreteType: 'Environment',
                              kind: 'LinkedField',
                              name: 'environment',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
                                v5 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'Environment',
                                  kind: 'LinkedField',
                                  name: 'parent',
                                  plural: false,
                                  selections: v16 /*: any*/,
                                  storageKey: null,
                                },
                              ],
                              storageKey: null,
                            },
                            {
                              alias: null,
                              args: null,
                              concreteType: 'ClaimedVersionsConnection',
                              kind: 'LinkedField',
                              name: 'claimedVersions',
                              plural: false,
                              selections: [
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ClaimedVersion',
                                  kind: 'LinkedField',
                                  name: 'nodes',
                                  plural: true,
                                  selections: [
                                    v12 /*: any*/,
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'Application',
                                      kind: 'LinkedField',
                                      name: 'application',
                                      plural: false,
                                      selections: v8 /*: any*/,
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'ApplicationPart',
                                      kind: 'LinkedField',
                                      name: 'applicationPart',
                                      plural: false,
                                      selections: v8 /*: any*/,
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'PublishedApplicationPart',
                                      kind: 'LinkedField',
                                      name: 'publishedApplicationPart',
                                      plural: false,
                                      selections: [
                                        v2 /*: any*/,
                                        v11 /*: any*/,
                                        v7 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v13 /*: any*/,
                                    v2 /*: any*/,
                                  ],
                                  storageKey: null,
                                },
                              ],
                              storageKey: null,
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
              storageKey: null,
            },
            v4 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: 'a66a54484e6c58a43cc8440b70b11e94',
      metadata: {},
      name: 'RemoveComponentFromApplicationPartDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = 'e4042625f2a9a9ef967362e8f5231e9e';

export default node;
