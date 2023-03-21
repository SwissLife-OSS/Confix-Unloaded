/**
 * @generated SignedSource<<70fa9ea989260410763cc7387c28648d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditComponentQuery$variables = {
  id: string;
};
export type EditComponentQuery$data = {
  readonly componentById: {
    readonly " $fragmentSpreads": FragmentRefs<"EditComponent">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"EditComponent_AvailableIn_Query">;
};
export type EditComponentQuery = {
  response: EditComponentQuery$data;
  variables: EditComponentQuery$variables;
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
  (v3/*: any*/),
  (v2/*: any*/)
],
v6 = [
  (v3/*: any*/)
],
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "definition",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  },
  (v2/*: any*/)
],
v8 = [
  (v2/*: any*/)
],
v9 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Component",
    "kind": "LinkedField",
    "name": "component",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  }
],
v10 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Variable",
    "kind": "LinkedField",
    "name": "variable",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditComponent"
          }
        ],
        "storageKey": null
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditComponent_AvailableIn_Query"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditComponentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Component",
        "kind": "LinkedField",
        "name": "componentById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ComponentScope",
            "kind": "LinkedField",
            "name": "scopes",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "applicationId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Application",
                "kind": "LinkedField",
                "name": "application",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "applicationPartId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationPart",
                "kind": "LinkedField",
                "name": "applicationPart",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              }
            ],
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
            "name": "values",
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
                        "selections": (v7/*: any*/),
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
                        "selections": (v5/*: any*/),
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
                        "selections": (v7/*: any*/),
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
                        "selections": (v5/*: any*/),
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
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Application",
                        "kind": "LinkedField",
                        "name": "application",
                        "plural": false,
                        "selections": (v8/*: any*/),
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
                    "selections": (v9/*: any*/),
                    "type": "CreateComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "RemoveComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v9/*: any*/),
                    "type": "RenameComponentChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
                    "type": "CreateVariableChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
                    "type": "DeleteVariableValueChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
                    "type": "RenameVariableChange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v10/*: any*/),
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
                        "selections": (v5/*: any*/),
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
        ],
        "storageKey": null
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "EditComponentQuery$defer$EditComponent_AvailableIn_Query",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Viewer",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "namespaces",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              }
            ],
            "concreteType": "ApplicationsConnection",
            "kind": "LinkedField",
            "name": "applications",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ApplicationsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Application",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ApplicationPart",
                        "kind": "LinkedField",
                        "name": "parts",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "applications(first:50)"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "4b79a52fce3562eee73181dad0685385",
    "id": null,
    "metadata": {},
    "name": "EditComponentQuery",
    "operationKind": "query",
    "text": "query EditComponentQuery(\n  $id: ID!\n) {\n  componentById(id: $id) {\n    ...EditComponent\n    id\n  }\n  ...EditComponent_AvailableIn_Query @defer(label: \"EditComponentQuery$defer$EditComponent_AvailableIn_Query\")\n}\n\nfragment ApplicationCascader_155EuJ on Query {\n  ...ApplicationCascader_Namespaces\n  ...ApplicationCascader_Applications_155EuJ\n}\n\nfragment ApplicationCascader_Applications_155EuJ on Query {\n  applications(first: 50) {\n    edges {\n      node {\n        namespace\n        id\n        name\n        parts {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment ApplicationCascader_Namespaces on Query {\n  me {\n    namespaces\n  }\n}\n\nfragment ChangeComponentScopeDialog on Query {\n  ...ApplicationCascader_155EuJ\n}\n\nfragment ChangeLog on ChangeLog {\n  id\n  modifiedAt\n  modifiedBy {\n    email\n  }\n  change {\n    kind\n    __typename\n    ...ChangeLog_RenameApplicationChange\n    ...ChangeLog_RenameApplicationPartChange\n    ...ChangeLog_AddComponentToApplicationPartChange\n    ...ChangeLog_AddPartToApplicationChange\n    ...ChangeLog_RemoveComponentFromApplicationPartChange\n    ...ChangeLog_RemovePartFromApplicationChange\n    ...ChangeLog_ApplicationPartComponentValuesChange\n    ...ChangeLog_ComponentSchemaChange\n    ...ChangeLog_ComponentValuesChange\n    ...ChangeLog_CreateComponentChange\n    ...ChangeLog_RemoveComponentChange\n    ...ChangeLog_RenameComponentChange\n    ...ChangeLog_CreateVariableChange\n    ...ChangeLog_DeleteVariableValueChange\n    ...ChangeLog_RenameVariableChange\n    ...ChangeLog_VariableValueChange\n    ...ChangeLog_PublishedApplicationPartChange\n    ... on ApplicationChange {\n      __isApplicationChange: __typename\n      versionOfApp: applicationVersion\n    }\n    ... on ApplicationPartChange {\n      __isApplicationPartChange: __typename\n      versionOfPart: partVersion\n    }\n    ... on ApplicationPartComponentChange {\n      __isApplicationPartComponentChange: __typename\n      versionOfPartComponent: partComponentVersion\n    }\n    ... on ComponentChange {\n      __isComponentChange: __typename\n      versionOfComponent: componentVersion\n    }\n    ... on VariableChange {\n      __isVariableChange: __typename\n      versionOfVariable: variableVersion\n    }\n  }\n}\n\nfragment ChangeLog_AddComponentToApplicationPartChange on AddComponentToApplicationPartChange {\n  addedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_AddPartToApplicationChange on AddPartToApplicationChange {\n  addedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_ApplicationPartComponentValuesChange on ApplicationPartComponentValuesChange {\n  part {\n    id\n  }\n  application {\n    id\n  }\n  partComponent {\n    id\n    version\n  }\n  partComponentVersion\n}\n\nfragment ChangeLog_ComponentSchemaChange on ComponentSchemaChange {\n  kind\n}\n\nfragment ChangeLog_ComponentValuesChange on ComponentValuesChange {\n  kind\n}\n\nfragment ChangeLog_CreateComponentChange on CreateComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_CreateVariableChange on CreateVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_DeleteVariableValueChange on DeleteVariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_PublishedApplicationPartChange on PublishedApplicationPartChange {\n  partVersion\n  part {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentChange on RemoveComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RemoveComponentFromApplicationPartChange on RemoveComponentFromApplicationPartChange {\n  removedComponent {\n    definition {\n      name\n      id\n    }\n    id\n  }\n}\n\nfragment ChangeLog_RemovePartFromApplicationChange on RemovePartFromApplicationChange {\n  removedPart {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameApplicationChange on RenameApplicationChange {\n  name\n}\n\nfragment ChangeLog_RenameApplicationPartChange on RenameApplicationPartChange {\n  name\n}\n\nfragment ChangeLog_RenameComponentChange on RenameComponentChange {\n  component {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_RenameVariableChange on RenameVariableChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment ChangeLog_VariableValueChange on VariableValueChange {\n  variable {\n    name\n    id\n  }\n}\n\nfragment EditComponent on Component {\n  id\n  name\n  ...EditComponent_AvailableIn\n  ...EditComponent_EditComponentForm\n  ...EditComponent_ComponentChangeLog\n}\n\nfragment EditComponent_AvailableIn on Component {\n  scopes {\n    namespace\n    applicationId\n    application {\n      name\n      id\n    }\n    applicationPartId\n    applicationPart {\n      name\n      id\n    }\n  }\n}\n\nfragment EditComponent_AvailableIn_Query on Query {\n  ...ChangeComponentScopeDialog\n}\n\nfragment EditComponent_ComponentChangeLog on Component {\n  changeLog {\n    ...ChangeLog\n    id\n  }\n}\n\nfragment EditComponent_EditComponentForm on Component {\n  id\n  schemaSdl\n  values\n}\n"
  }
};
})();

(node as any).hash = "28a6c8a876d1d8fbe7a4b6545ffa331f";

export default node;
