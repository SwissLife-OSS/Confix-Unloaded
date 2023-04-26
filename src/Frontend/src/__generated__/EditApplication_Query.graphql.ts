/**
 * @generated SignedSource<<6fba1b04182e43e81099e6d85e348367>>
 * @relayHash d7b70922c18a41e7950b28c588bfc3bc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d7b70922c18a41e7950b28c588bfc3bc

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditApplication_Query$variables = {
  id: string;
};
export type EditApplication_Query$data = {
  readonly applicationById: {
    readonly ' $fragmentSpreads': FragmentRefs<'EditApplication'>;
  } | null;
};
export type EditApplication_Query = {
  response: EditApplication_Query$data;
  variables: EditApplication_Query$variables;
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
      name: 'id',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v4 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'namespace',
      storageKey: null,
    },
    v5 = [v2 /*: any*/, v3 /*: any*/],
    v6 = [v3 /*: any*/],
    v7 = [v3 /*: any*/, v2 /*: any*/],
    v8 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: v7 /*: any*/,
        storageKey: null,
      },
      v2 /*: any*/,
    ],
    v9 = [v2 /*: any*/],
    v10 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v7 /*: any*/,
        storageKey: null,
      },
    ],
    v11 = [
      {
        alias: null,
        args: null,
        concreteType: 'Variable',
        kind: 'LinkedField',
        name: 'variable',
        plural: false,
        selections: v7 /*: any*/,
        storageKey: null,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditApplication_Query',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Application',
          kind: 'LinkedField',
          name: 'applicationById',
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
      name: 'EditApplication_Query',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Application',
          kind: 'LinkedField',
          name: 'applicationById',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            v4 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ApplicationPart',
              kind: 'LinkedField',
              name: 'parts',
              plural: true,
              selections: [
                v2 /*: any*/,
                v3 /*: any*/,
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
                        v2 /*: any*/,
                        v3 /*: any*/,
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
                  selections: [v2 /*: any*/, v4 /*: any*/],
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
                    v2 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Environment',
                      kind: 'LinkedField',
                      name: 'environment',
                      plural: false,
                      selections: v5 /*: any*/,
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Variable',
                      kind: 'LinkedField',
                      name: 'variable',
                      plural: false,
                      selections: v5 /*: any*/,
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
                          selections: v6 /*: any*/,
                          type: 'RenameApplicationChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v6 /*: any*/,
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
                              selections: v8 /*: any*/,
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
                              selections: v7 /*: any*/,
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
                              selections: v8 /*: any*/,
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
                              selections: v7 /*: any*/,
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
                              selections: v9 /*: any*/,
                              storageKey: null,
                            },
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
                              concreteType: 'ApplicationPartComponent',
                              kind: 'LinkedField',
                              name: 'partComponent',
                              plural: false,
                              selections: [
                                v2 /*: any*/,
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
                          selections: v10 /*: any*/,
                          type: 'CreateComponentChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v10 /*: any*/,
                          type: 'RemoveComponentChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v10 /*: any*/,
                          type: 'RenameComponentChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v11 /*: any*/,
                          type: 'CreateVariableChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v11 /*: any*/,
                          type: 'DeleteVariableValueChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v11 /*: any*/,
                          type: 'RenameVariableChange',
                          abstractKey: null,
                        },
                        {
                          kind: 'InlineFragment',
                          selections: v11 /*: any*/,
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
                              selections: v7 /*: any*/,
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
      ],
    },
    params: {
      id: 'd7b70922c18a41e7950b28c588bfc3bc',
      metadata: {},
      name: 'EditApplication_Query',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '963543d2c38947d8cba4bbdfe1c2429b';

export default node;
