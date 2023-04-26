/**
 * @generated SignedSource<<802bac7941556f26e78393217a73f21c>>
 * @relayHash bd6dc00d89432f407c382f2356e2569f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bd6dc00d89432f407c382f2356e2569f

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplicationPartComponent_GetById_Query$variables = {
  partComponentId: string;
};
export type EditApplicationPartComponent_GetById_Query$data = {
  readonly ' $fragmentSpreads': FragmentRefs<'EditApplicationPartComponent'>;
};
export type EditApplicationPartComponent_GetById_Query = {
  response: EditApplicationPartComponent_GetById_Query$data;
  variables: EditApplicationPartComponent_GetById_Query$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'partComponentId',
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v3 = [v1 /*: any*/, v2 /*: any*/],
    v4 = {
      alias: null,
      args: null,
      concreteType: 'Variable',
      kind: 'LinkedField',
      name: 'variable',
      plural: false,
      selections: v3 /*: any*/,
      storageKey: null,
    },
    v5 = [v4 /*: any*/, v2 /*: any*/],
    v6 = {
      alias: null,
      args: null,
      concreteType: 'VariableValue',
      kind: 'LinkedField',
      name: 'variableValues',
      plural: true,
      selections: v5 /*: any*/,
      storageKey: null,
    },
    v7 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'version',
      storageKey: null,
    },
    v8 = [v1 /*: any*/],
    v9 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: v3 /*: any*/,
        storageKey: null,
      },
      v2 /*: any*/,
    ],
    v10 = [v2 /*: any*/],
    v11 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v3 /*: any*/,
        storageKey: null,
      },
    ],
    v12 = [v4 /*: any*/];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditApplicationPartComponent_GetById_Query',
      selections: [
        {
          args: null,
          kind: 'FragmentSpread',
          name: 'EditApplicationPartComponent',
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditApplicationPartComponent_GetById_Query',
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
                  selections: [
                    v1 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      kind: 'ScalarField',
                      name: 'namespace',
                      storageKey: null,
                    },
                    v2 /*: any*/,
                    v6 /*: any*/,
                  ],
                  storageKey: null,
                },
                v2 /*: any*/,
                v6 /*: any*/,
              ],
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
                v1 /*: any*/,
                v2 /*: any*/,
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
            v7 /*: any*/,
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'values',
              storageKey: null,
            },
            {
              if: null,
              kind: 'Defer',
              label:
                'EditApplicationPartComponent$defer$EditApplicationPartComponent_ApplicationPartComponentChangeLog',
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
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: '__typename',
                          storageKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v8 /*: any*/,
                          type: 'RenameApplicationChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v8 /*: any*/,
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
                              selections: v3 /*: any*/,
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
                              selections: v3 /*: any*/,
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
                              selections: [v2 /*: any*/, v7 /*: any*/],
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
                              selections: v3 /*: any*/,
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
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: 'VariableValue',
          kind: 'LinkedField',
          name: 'globalVariableValues',
          plural: true,
          selections: v5 /*: any*/,
          storageKey: null,
        },
      ],
    },
    params: {
      id: 'bd6dc00d89432f407c382f2356e2569f',
      metadata: {},
      name: 'EditApplicationPartComponent_GetById_Query',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '10dc12c21ee41436bada4ff82c0d1642';

export default node;
