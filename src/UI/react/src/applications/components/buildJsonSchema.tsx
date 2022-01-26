import {
  DocumentNode,
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  parse,
  TypeNode,
  UnionTypeDefinitionNode,
} from "graphql";
import { JSONSchema6, JSONSchema6Definition } from "json-schema";

const typeMappings: Record<string, JSONSchema6> = {
  String: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  Float: { type: "number" },
  Short: { type: "number" },
  Decimal: { type: "number" },
  Int: { type: "number" },
  Boolean: { type: "boolean" },
  ID: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  UUID: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  Byte: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  ByteArray: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  Url: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  URL: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  Date: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  DateTime: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
  Any: {
    anyOf: [{ type: "string" }, { $ref: `#/definitions/__Variables` }],
  },
};

export const translateType = (
  type: TypeNode,
  field: FieldDefinitionNode,
  isNonNull: boolean = false
): any => {
  if (type.kind === Kind.LIST_TYPE) {
    var oneOf: JSONSchema6[] = [
      {
        type: "array",
        items: translateType(type.type, field, false),
      },
    ];
    if (!isNonNull) {
      oneOf = [{ type: "null" }, ...oneOf];
    }
    return {
      oneOf,
      description: field.description?.value,
    };
  } else if (type.kind === Kind.NON_NULL_TYPE) {
    return translateType(type.type, field, true);
  } else if (type.kind === Kind.NAMED_TYPE) {
    var definition = !!typeMappings[type.name.value]
      ? typeMappings[type.name.value]
      : {
          $ref: `#/definitions/${type.name.value}`,
        };
    var oneOf = [definition];
    if (!isNonNull) {
      oneOf = [{ type: "null" }, ...oneOf];
    }

    return {
      oneOf,
      description: field.description?.value,
    };
  }
};

export const sdlToJsonSchema = (
  doc: string,
  variables: string[]
): JSONSchema6 | undefined => {
  try {
    if (doc) {
      var root = parse(doc);
      var schema = buildJsonSchema(root, variables);
      console.log(schema);
      return schema;
    }
  } catch (e) {}
};
export const buildJsonSchema = (
  doc: DocumentNode,
  variables: string[]
): JSONSchema6 => {
  let definitions: Record<string, JSONSchema6Definition> = doc.definitions
    .filter(
      (x) =>
        x.kind === Kind.OBJECT_TYPE_DEFINITION ||
        x.kind === Kind.UNION_TYPE_DEFINITION ||
        x.kind === Kind.ENUM_TYPE_DEFINITION
    )
    .reduce((r, c) => {
      switch (c.kind) {
        case Kind.OBJECT_TYPE_DEFINITION:
          return {
            ...r,
            [c.name.value]: createObjectTypeDefinition(c),
          };
        case Kind.ENUM_TYPE_DEFINITION:
          return {
            ...r,
            [c.name.value]: createEnumTypeDefinition(c),
          };
        case Kind.UNION_TYPE_DEFINITION:
          return {
            ...r,
            [c.name.value]: createUnionTypeDefinition(c),
          };
      }
      return r;
    }, {});

  const rootType = doc.definitions.find(
    (x) => x.kind === Kind.OBJECT_TYPE_DEFINITION
  ) as ObjectTypeDefinitionNode;

  const { properties, required } = createObjectTypeDefinition(rootType);

  definitions["__Variables"] = {
    enum: variables.map((x) => `{${x}}`),
  };

  return {
    $schema: "http://json-schema.org/draft-06/schema#",
    definitions,
    properties,
    required,
  };
};

const createEnumTypeDefinition = (
  node: EnumTypeDefinitionNode
): JSONSchema6 => {
  return {
    anyOf: [
      {
        title: node.name.value,
        description: node.description?.value,
        enum: node?.values?.map((v) => v.name.value),
      },
      { $ref: `#/definitions/__Variables` },
    ],
  };
};

const createUnionTypeDefinition = (
  node: UnionTypeDefinitionNode
): JSONSchema6 => {
  return {
    title: node.name.value,
    description: node.description?.value,
    anyOf: node?.types
      ?.map((x) => ({
        $ref: `#/definitions/${x.name.value}`,
      }))
      .filter((x) => !!x),
  };
};

const createObjectTypeDefinition = (
  node: ObjectTypeDefinitionNode
): JSONSchema6 => {
  return {
    type: "object",
    title: node.name.value,
    description: node.description?.value,
    properties: node.fields?.reduce(
      (p, f) => ({
        ...p,
        [f.name.value]: translateType(f.type, f),
      }),
      {}
    ),
    required: node.fields
      ?.filter((x) => x.type.kind === Kind.NON_NULL_TYPE)
      .map((x) => x.name.value),
  };
};
