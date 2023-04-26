/**
 * @generated SignedSource<<ed5a29e840499cd201f983a418668749>>
 * @relayHash 4b79a52fce3562eee73181dad0685385
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4b79a52fce3562eee73181dad0685385

import {ConcreteRequest, Query} from 'relay-runtime';
import {FragmentRefs} from 'relay-runtime';
export type EditComponentQuery$variables = {
  id: string;
};
export type EditComponentQuery$data = {
  readonly componentById: {
    readonly ' $fragmentSpreads': FragmentRefs<'EditComponent'>;
  } | null;
  readonly ' $fragmentSpreads': FragmentRefs<'EditComponent_AvailableIn_Query'>;
};
export type EditComponentQuery = {
  response: EditComponentQuery$data;
  variables: EditComponentQuery$variables;
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
    v5 = [v3 /*: any*/, v2 /*: any*/],
    v6 = [v3 /*: any*/],
    v7 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'definition',
        plural: false,
        selections: v5 /*: any*/,
        storageKey: null,
      },
      v2 /*: any*/,
    ],
    v8 = [v2 /*: any*/],
    v9 = [
      {
        alias: null,
        args: null,
        concreteType: 'Component',
        kind: 'LinkedField',
        name: 'component',
        plural: false,
        selections: v5 /*: any*/,
        storageKey: null,
      },
    ],
    v10 = [
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
    ];
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'EditComponentQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Component',
          kind: 'LinkedField',
          name: 'componentById',
          plural: false,
          selections: [
            {
              args: null,
              kind: 'FragmentSpread',
              name: 'EditComponent',
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
              name: 'EditComponent_AvailableIn_Query',
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
      name: 'EditComponentQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'Component',
          kind: 'LinkedField',
          name: 'componentById',
          plural: false,
          selections: [
            v2 /*: any*/,
            v3 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: 'ComponentScope',
              kind: 'LinkedField',
              name: 'scopes',
              plural: true,
              selections: [
                v4 /*: any*/,
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
                  selections: v5 /*: any*/,
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
                  selections: v5 /*: any*/,
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: 'ScalarField',
              name: 'schemaSdl',
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
                          selections: v7 /*: any*/,
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
                          selections: v5 /*: any*/,
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
                          selections: v7 /*: any*/,
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
                          selections: v5 /*: any*/,
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
                          selections: v8 /*: any*/,
                          storageKey: null,
                        },
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
                      selections: v9 /*: any*/,
                      type: 'CreateComponentChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v9 /*: any*/,
                      type: 'RemoveComponentChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v9 /*: any*/,
                      type: 'RenameComponentChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v10 /*: any*/,
                      type: 'CreateVariableChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v10 /*: any*/,
                      type: 'DeleteVariableValueChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v10 /*: any*/,
                      type: 'RenameVariableChange',
                      abstractKey: null,
                    },
                    {
                      kind: 'InlineFragment',
                      selections: v10 /*: any*/,
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
                          selections: v5 /*: any*/,
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
          label: 'EditComponentQuery$defer$EditComponent_AvailableIn_Query',
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Viewer',
              kind: 'LinkedField',
              name: 'me',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'namespaces',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: [
                {
                  kind: 'Literal',
                  name: 'first',
                  value: 50,
                },
              ],
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
                        v4 /*: any*/,
                        v2 /*: any*/,
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'ApplicationPart',
                          kind: 'LinkedField',
                          name: 'parts',
                          plural: true,
                          selections: [v2 /*: any*/, v3 /*: any*/],
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: 'applications(first:50)',
            },
          ],
        },
      ],
    },
    params: {
      id: '4b79a52fce3562eee73181dad0685385',
      metadata: {},
      name: 'EditComponentQuery',
      operationKind: 'query',
      text: null,
    },
  };
})();

(node as any).hash = '28a6c8a876d1d8fbe7a4b6545ffa331f';

export default node;
