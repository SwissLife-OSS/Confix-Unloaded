/**
 * @generated SignedSource<<4b678bc4ab3679d0f6a2c9cc99858456>>
 * @relayHash a14610338fdde562c940776bbad52567
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a14610338fdde562c940776bbad52567

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditVariableQuery$variables = {
  id: string;
};
export type EditVariableQuery$data = {
  readonly variable: {
    readonly ' $fragmentSpreads': FragmentRefs<'EditVariable'>;
  } | null;
  readonly ' $fragmentSpreads': FragmentRefs<'EditVariable_ApplicationSelector'>;
};
export type EditVariableQuery = {
  response: EditVariableQuery$data;
  variables: EditVariableQuery$variables;
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
      name: '__typename',
      storageKey: null,
    },
    v5 = [v3 /*: any*/],
    v6 = [v3 /*: any*/, v2 /*: any*/],
    v7 = {
      alias: null,
      args: null,
      concreteType: 'Component',
      kind: 'LinkedField',
      name: 'definition',
      plural: false,
      selections: v6 /*: any*/,
      storageKey: null,
    },
    v8 = [v7 /*: any*/, v2 /*: any*/],
    v9 = [v2 /*: any*/],
    v10 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v6 /*: any*/,
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
        selections: v6 /*: any*/,
        storageKey: null,
      },
    ],
    v12 = [
      {
        kind: 'Literal',
        name: 'first',
        value: 20,
      },
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditVariableQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Variable',
          kind: 'LinkedField',
          name: 'variable',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'EditVariable',
            },
          ],
          storageKey: null,
        },
        {
          kind: 'Defer',
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'EditVariable_ApplicationSelector',
            },
          ],
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'EditVariableQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Variable',
          kind: 'LinkedField',
          name: 'variable',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
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
              name: 'isSecret',
              storageKey: null,
            },
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
                    v4 /*: any*/,
                    {
                      kind: 'InlineFragment',
                      selections: v5 /*: any*/,
                      type: 'RenameApplicationChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v5 /*: any*/,
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
                          selections: v6 /*: any*/,
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
                          selections: v6 /*: any*/,
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
                          selections: v6 /*: any*/,
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
          storageKey: null,
        },
        {
          if: null,
          kind: 'Defer',
          label: 'EditVariableQuery$defer$EditVariable_ApplicationSelector',
          selections: [
            {
              alias: null,
              args: v12 /*: any*/,
              concreteType: 'ApplicationsConnection',
              kind: 'LinkedField',
              name: 'applications',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'ApplicationsEdge',
                  kind: 'LinkedField',
                  name: 'edges',
                  plural: true,
                  selections: [
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Application',
                      kind: 'LinkedField',
                      name: 'node',
                      plural: false,
                      selections: [
                        v2 /*: any*/,
                        v3 /*: any*/,
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
                              selections: [v2 /*: any*/, v7 /*: any*/],
                              storageKey: null,
                            },
                          ],
                          storageKey: null,
                        },
                        v4 /*: any*/,
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
              storageKey: 'applications(first:20)',
            },
            {
              alias: null,
              args: v12 /*: any*/,
              filters: ['search'],
              handle: 'connection',
              key: 'Query_applications',
              kind: 'LinkedHandle',
              name: 'applications',
            },
          ],
        },
      ],
    },
    params: {
      id: 'a14610338fdde562c940776bbad52567',
      metadata: {},
      name: 'EditVariableQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = 'de372cb86027eb98773823fa45d8a0ea';

export default node;
