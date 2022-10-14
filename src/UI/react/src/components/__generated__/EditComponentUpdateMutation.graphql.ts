/**
 * @generated SignedSource<<cfe82987946ec06a339a43446113b597>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateComponentValuesInput = {
  id: string;
  values?: any | null;
};
export type UpdateComponentSchemaInput = {
  id: string;
  schema: string;
};
export type EditComponentUpdateMutation$variables = {
  schemaInput: UpdateComponentSchemaInput;
  valuesInput: UpdateComponentValuesInput;
};
export type EditComponentUpdateMutation$data = {
  readonly updateComponentSchema: {
    readonly component: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"EditComponent_component">;
    } | null;
  };
  readonly updateComponentValues: {
    readonly component: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"EditComponent_component">;
    } | null;
  };
};
export type EditComponentUpdateMutation = {
  response: EditComponentUpdateMutation$data;
  variables: EditComponentUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "schemaInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "valuesInput"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "schemaInput"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EditComponent_component"
      }
    ],
    "storageKey": null
  }
],
v5 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "valuesInput"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v6/*: any*/)
],
v8 = [
  (v6/*: any*/),
  (v3/*: any*/)
],
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  (v3/*: any*/)
],
v10 = [
  (v3/*: any*/)
],
v11 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  }
],
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  }
],
v13 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v6/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "state",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "schemaSdl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "schema",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "values",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "defaults",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "SchemaViolation",
        "kind": "LinkedField",
        "name": "schemaViolations",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "path",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ChangeLog",
        "kind": "LinkedField",
        "name": "changeLog",
        "plural": true,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "change",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "RenameApplicationChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "RenameApplicationPartChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPartComponent",
                    "kind": "LinkedField",
                    "name": "addedComponent",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "AddComponentToApplicationPartChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "addedPart",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "AddPartToApplicationChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPartComponent",
                    "kind": "LinkedField",
                    "name": "removedComponent",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "RemoveComponentFromApplicationPartChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "removedPart",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "RemovePartFromApplicationChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "part",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Application",
                    "kind": "LinkedField",
                    "name": "application",
                    "plural": false,
                    "selections": (v10/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPartComponent",
                    "kind": "LinkedField",
                    "name": "partComponent",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "version",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partComponentVersion",
                    "storageKey": null
                  }
                ],
                "type": "ApplicationPartComponentValuesChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "CreateComponentChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "RemoveComponentChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v11/*: any*/),
                "type": "RenameComponentChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "CreateVariableChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "DeleteVariableValueChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "RenameVariableChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v12/*: any*/),
                "type": "VariableValueChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partVersion",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ApplicationPart",
                    "kind": "LinkedField",
                    "name": "part",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "PublishedApplicationPartChange",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "versionOfApp",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "applicationVersion",
                    "storageKey": null
                  }
                ],
                "type": "ApplicationChange",
                "abstractKey": "__isApplicationChange"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "versionOfPart",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partVersion",
                    "storageKey": null
                  }
                ],
                "type": "ApplicationPartChange",
                "abstractKey": "__isApplicationPartChange"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "versionOfPartComponent",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "partComponentVersion",
                    "storageKey": null
                  }
                ],
                "type": "ApplicationPartComponentChange",
                "abstractKey": "__isApplicationPartComponentChange"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "versionOfComponent",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "componentVersion",
                    "storageKey": null
                  }
                ],
                "type": "ComponentChange",
                "abstractKey": "__isComponentChange"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": "versionOfVariable",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "variableVersion",
                    "storageKey": null
                  }
                ],
                "type": "VariableChange",
                "abstractKey": "__isVariableChange"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "modifiedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserInfo",
            "kind": "LinkedField",
            "name": "modifiedBy",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateComponentSchemaPayload",
        "kind": "LinkedField",
        "name": "updateComponentSchema",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditComponentUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdateComponentSchemaPayload",
        "kind": "LinkedField",
        "name": "updateComponentSchema",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "UpdateComponentValuesPayload",
        "kind": "LinkedField",
        "name": "updateComponentValues",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d97c16022b213e1014805e7d75d10744",
    "id": null,
    "metadata": {},
    "name": "EditComponentUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EditComponentUpdateMutation(\n  $valuesInput: UpdateComponentValuesInput!\n  $schemaInput: UpdateComponentSchemaInput!\n) {\n  updateComponentSchema(input: $schemaInput) {\n    component {\n      id\n      ...EditComponent_component\n    }\n  }\n  updateComponentValues(input: $valuesInput) {\n    component {\n      id\n      ...EditComponent_component\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_fragment on ChangeLog {\n  id\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n    ... on ApplicationChange {\n      __isApplicationChange: __typename\n      versionOfApp: applicationVersion\n    }\n    ... on ApplicationPartChange {\n      __isApplicationPartChange: __typename\n      versionOfPart: partVersion\n    }\n    ... on ApplicationPartComponentChange {\n      __isApplicationPartComponentChange: __typename\n      versionOfPartComponent: partComponentVersion\n    }\n    ... on ComponentChange {\n      __isComponentChange: __typename\n      versionOfComponent: componentVersion\n    }\n    ... on VariableChange {\n      __isVariableChange: __typename\n      versionOfVariable: variableVersion\n    }\n  }\n  modifiedAt\n  modifiedBy {\n    email\n  }\n}\n\nfragment EditComponent_component on Component {\n  id\n  name\n  state\n  schemaSdl\n  schema\n  values\n  defaults\n  schemaViolations {\n    path\n    code\n  }\n  changeLog {\n    ...ChangeLog_fragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "edc934f8a1970a9724d8f8e9e206716f";

export default node;
