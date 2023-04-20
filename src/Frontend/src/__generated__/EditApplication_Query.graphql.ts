/**
 * @generated SignedSource<<0456aac13621e047186cae2c5994de9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditApplication_Query$variables = {
  id: string;
};
export type EditApplication_Query$data = {
  readonly applicationById: {
    readonly " $fragmentSpreads": FragmentRefs<"EditApplication">;
  } | null;
};
export type EditApplication_Query = {
  response: EditApplication_Query$data;
  variables: EditApplication_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "namespace",
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v6 = [
  (v3/*: any*/)
],
v7 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v9 = [
  (v2/*: any*/)
],
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  }
],
v11 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditApplication_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "applicationById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditApplication"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditApplication_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Application",
        "kind": "LinkedField",
        "name": "applicationById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ApplicationPart",
            "kind": "LinkedField",
            "name": "parts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPartComponent",
                "kind": "LinkedField",
                "name": "components",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Component",
                    "kind": "LinkedField",
                    "name": "definition",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "application",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplication$defer$EditApplication_Variables",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "VariableValue",
                "kind": "LinkedField",
                "name": "variableValues",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Environment",
                    "kind": "LinkedField",
                    "name": "environment",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Variable",
                    "kind": "LinkedField",
                    "name": "variable",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "value",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
          },
          {
            "if": null,
            "kind": "Defer",
            "label": "EditApplication$defer$EditApplication_ApplicationChangeLog",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ChangeLog",
                "kind": "LinkedField",
                "name": "changeLog",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
                  },
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
                        "selections": (v6/*: any*/),
                        "type": "RenameApplicationChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
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
                            "selections": (v8/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v8/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                            "selections": (v9/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Application",
                            "kind": "LinkedField",
                            "name": "application",
                            "plural": false,
                            "selections": (v9/*: any*/),
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
                              (v2/*: any*/),
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
                        "selections": (v10/*: any*/),
                        "type": "CreateComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "RemoveComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v10/*: any*/),
                        "type": "RenameComponentChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
                        "type": "CreateVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
                        "type": "DeleteVariableValueChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
                        "type": "RenameVariableChange",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v11/*: any*/),
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
                            "selections": (v7/*: any*/),
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
                  }
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d7b70922c18a41e7950b28c588bfc3bc",
    "id": null,
    "metadata": {},
    "name": "EditApplication_Query",
    "operationKind": "query",
    "text": "query EditApplication_Query(\n  $id: ID!\n) {\n  applicationById(id: $id) {\n    ...EditApplication\n    id\n  }\n}\n\nfragment AddComponentsToApplicationPartDialog on ApplicationPart {\n  id\n  name\n  application {\n    id\n    namespace\n  }\n}\n\nfragment ApplicationPartSectionHeader on Application {\n  id\n  name\n}\n\nfragment ChangeLog on ChangeLog {\n  id\n  modifiedAt\n  modifiedBy {\n    email\n  }\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n    ... on ApplicationChange {\n      __isApplicationChange: __typename\n      versionOfApp: applicationVersion\n    }\n    ... on ApplicationPartChange {\n      __isApplicationPartChange: __typename\n      versionOfPart: partVersion\n    }\n    ... on ApplicationPartComponentChange {\n      __isApplicationPartComponentChange: __typename\n      versionOfPartComponent: partComponentVersion\n    }\n    ... on ComponentChange {\n      __isComponentChange: __typename\n      versionOfComponent: componentVersion\n    }\n    ... on VariableChange {\n      __isVariableChange: __typename\n      versionOfVariable: variableVersion\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment EditApplication on Application {\n  id\n  name\n  namespace\n  ...EditApplication_Variables @defer(label: \"EditApplication$defer$EditApplication_Variables\")\n  ...EditApplication_ApplicationChangeLog @defer(label: \"EditApplication$defer$EditApplication_ApplicationChangeLog\")\n  ...EditApplication_ApplicationParts\n  ...ApplicationPartSectionHeader\n}\n\nfragment EditApplication_ApplicationChangeLog on Application {\n  changeLog {\n    ...ChangeLog\n    id\n  }\n}\n\nfragment EditApplication_ApplicationParts on Application {\n  id\n  parts {\n    ...EditApplication_ApplicationPartsDisplay\n    id\n  }\n}\n\nfragment EditApplication_ApplicationPartsDisplay on ApplicationPart {\n  id\n  name\n  components {\n    definition {\n      id\n      name\n      state\n    }\n    id\n  }\n  ...AddComponentsToApplicationPartDialog\n}\n\nfragment EditApplication_Variables on Application {\n  variableValues {\n    ...VariableValueList\n    id\n  }\n}\n\nfragment VariableValueList on VariableValue {\n  id\n  environment {\n    id\n    name\n  }\n  variable {\n    id\n    name\n  }\n  value\n}\n"
  }
};
})();

(node as any).hash = "963543d2c38947d8cba4bbdfe1c2429b";

export default node;
