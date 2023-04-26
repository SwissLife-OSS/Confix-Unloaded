/**
 * @generated SignedSource<<feaefb168dc40e454f869ebe58601fcb>>
 * @relayHash f11e189c8812f935b692608d5dd803bf
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f11e189c8812f935b692608d5dd803bf

import {ConcreteRequest, Mutation} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type RenameApplicationPartInput = {
  applicationPartId: string;
  name: string;
};
export type RenameApplicationPartDialogMutation$variables = {
  input: RenameApplicationPartInput;
};
export type RenameApplicationPartDialogMutation$data = {
  readonly renameApplicationPart: {
    readonly applicationPart: {
      readonly application: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<'ApplicationsListItem'>;
      } | null;
      readonly ' $fragmentSpreads': FragmentRefs<'EditApplicationPart'>;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly code?: string;
      readonly message?: string;
    }> | null;
  };
};
export type RenameApplicationPartDialogMutation = {
  response: RenameApplicationPartDialogMutation$data;
  variables: RenameApplicationPartDialogMutation$variables;
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
    v6 = [v2 /*: any*/, v4 /*: any*/],
    v7 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ],
    v8 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'publishedAt',
      storageKey: null,
    },
    v9 = [v4 /*: any*/, v2 /*: any*/],
    v10 = {
      alias: null,
      args: null,
      concreteType: 'ApplicationPart',
      kind: 'LinkedField',
      name: 'part',
      plural: false,
      selections: v9 /*: any*/,
      storageKey: null,
    },
    v11 = [
      {
        alias: null,
        args: null,
        kind: 'ScalarField',
        name: 'email',
        storageKey: null,
      },
    ],
    v12 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'version',
      storageKey: null,
    },
    v13 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'tag',
      storageKey: null,
    },
    v14 = {
      alias: null,
      args: null,
      concreteType: 'Environment',
      kind: 'LinkedField',
      name: 'environment',
      plural: false,
      selections: v9 /*: any*/,
      storageKey: null,
    },
    v15 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: '__typename',
      storageKey: null,
    },
    v16 = [v2 /*: any*/],
    v17 = {
      alias: null,
      args: null,
      concreteType: 'Application',
      kind: 'LinkedField',
      name: 'application',
      plural: false,
      selections: v16 /*: any*/,
      storageKey: null,
    },
    v18 = [v4 /*: any*/],
    v19 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: v9 /*: any*/,
        storageKey: null,
      },
      v2 /*: any*/,
    ],
    v20 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v9 /*: any*/,
        storageKey: null,
      },
    ],
    v21 = [
      {
        alias: null,
        args: null,
        concreteType: 'Variable',
        kind: 'LinkedField',
        name: 'variable',
        plural: false,
        selections: v9 /*: any*/,
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'RenameApplicationPartDialogMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'RenameApplicationPartPayload',
          kind: 'LinkedField',
          name: 'renameApplicationPart',
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
                {
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'EditApplicationPart',
                },
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
                      args: null,
                      kind: 'FragmentSpread',
                      name: 'ApplicationsListItem',
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
              concreteType: null,
              kind: 'LinkedField',
              name: 'errors',
              plural: true,
              selections: [v3 /*: any*/],
              storageKey: null,
            },
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
      name: 'RenameApplicationPartDialogMutation',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'RenameApplicationPartPayload',
          kind: 'LinkedField',
          name: 'renameApplicationPart',
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
                v4 /*: any*/,
                {
                  alias: null,
                  args: null,
                  concreteType: 'Application',
                  kind: 'LinkedField',
                  name: 'application',
                  plural: false,
                  selections: [
                    v2 /*: any*/,
                    v5 /*: any*/,
                    v4 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'ApplicationPart',
                      kind: 'LinkedField',
                      name: 'parts',
                      plural: true,
                      selections: [
                        v4 /*: any*/,
                        v2 /*: any*/,
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
                              selections: v6 /*: any*/,
                              storageKey: null,
                            },
                            v2 /*: any*/,
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
                          selections: [v2 /*: any*/, v5 /*: any*/],
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
                  ],
                  storageKey: null,
                },
                {
                  alias: null,
                  args: v7 /*: any*/,
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
                            v8 /*: any*/,
                            v10 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: 'UserInfo',
                              kind: 'LinkedField',
                              name: 'publishedBy',
                              plural: false,
                              selections: v11 /*: any*/,
                              storageKey: null,
                            },
                            v12 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              concreteType: 'ClaimedVersion',
                              kind: 'LinkedField',
                              name: 'claimsVersions',
                              plural: true,
                              selections: [
                                v13 /*: any*/,
                                v14 /*: any*/,
                                v2 /*: any*/,
                              ],
                              storageKey: null,
                            },
                            v15 /*: any*/,
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
                  args: v7 /*: any*/,
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
                    v17 /*: any*/,
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
                          selections: v11 /*: any*/,
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
                            v15 /*: any*/,
                            {
                              kind: 'InlineFragment',
                              selections: v18 /*: any*/,
                              type: 'RenameApplicationChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v18 /*: any*/,
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
                                  selections: v19 /*: any*/,
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
                                  selections: v9 /*: any*/,
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
                                  selections: v19 /*: any*/,
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
                                  selections: v9 /*: any*/,
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
                                  selections: v16 /*: any*/,
                                  storageKey: null,
                                },
                                v17 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'ApplicationPartComponent',
                                  kind: 'LinkedField',
                                  name: 'partComponent',
                                  plural: false,
                                  selections: [v2 /*: any*/, v12 /*: any*/],
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
                              selections: v20 /*: any*/,
                              type: 'CreateComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
                              type: 'RemoveComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v20 /*: any*/,
                              type: 'RenameComponentChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v21 /*: any*/,
                              type: 'CreateVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v21 /*: any*/,
                              type: 'DeleteVariableValueChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v21 /*: any*/,
                              type: 'RenameVariableChange',
                              abstractKey: null,
                            },
                            {
                              kind: 'InlineFragment',
                              selections: v21 /*: any*/,
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
                                v10 /*: any*/,
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
                                v4 /*: any*/,
                                {
                                  alias: null,
                                  args: null,
                                  concreteType: 'Environment',
                                  kind: 'LinkedField',
                                  name: 'parent',
                                  plural: false,
                                  selections: v6 /*: any*/,
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
                                    v13 /*: any*/,
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'Application',
                                      kind: 'LinkedField',
                                      name: 'application',
                                      plural: false,
                                      selections: v9 /*: any*/,
                                      storageKey: null,
                                    },
                                    {
                                      alias: null,
                                      args: null,
                                      concreteType: 'ApplicationPart',
                                      kind: 'LinkedField',
                                      name: 'applicationPart',
                                      plural: false,
                                      selections: v9 /*: any*/,
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
                                        v12 /*: any*/,
                                        v8 /*: any*/,
                                      ],
                                      storageKey: null,
                                    },
                                    v14 /*: any*/,
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
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: 'LinkedField',
              name: 'errors',
              plural: true,
              selections: [v15 /*: any*/, v3 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      id: 'f11e189c8812f935b692608d5dd803bf',
      metadata: {},
      name: 'RenameApplicationPartDialogMutation',
      operationKind: 'mutation',
      text: null,
    },
  };
})();

(node as any).hash = '6233308926cadb07749cb4501ca6368f';

export default node;
