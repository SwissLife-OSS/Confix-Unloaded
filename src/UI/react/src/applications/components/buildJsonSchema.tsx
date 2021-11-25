import {
  DocumentNode,
  EnumTypeDefinitionNode,
  FieldDefinitionNode,
  Kind,
  NamedTypeNode,
  ObjectTypeDefinitionNode,
  parse,
  TypeDefinitionNode,
  TypeNode,
  UnionTypeDefinitionNode,
} from "graphql";
import { JSONSchema6, JSONSchema6Definition } from "json-schema";

const typeMappings: Record<string, JSONSchema6> = {
  String: { type: "string" },
  Float: { type: "number" },
  Short: { type: "number" },
  Decimal: { type: "number" },
  Int: { type: "number" },
  Boolean: { type: "boolean" },
  ID: { type: "string" },
  UUID: { type: "string" },
  Byte: { type: "string" },
  ByteArray: { type: "string" },
  Url: { type: "string", format: "uri" },
  URL: { type: "string", format: "uri" },
  Date: { type: "string", format: "date" },
  DateTime: { type: "string", format: "date-time" },
  Any: { type: "object" },
};

export const translateType = (
  type: TypeNode,
  field: FieldDefinitionNode
): any => {
  if (type.kind === Kind.LIST_TYPE) {
    return {
      allOf: [
        {
          type: "array",
          items: translateType(type.type, field),
        },
      ],
      description: field.description?.value,
    };
  } else if (type.kind === Kind.NON_NULL_TYPE) {
    return translateType(type.type, field);
  } else if (type.kind === Kind.NAMED_TYPE) {
    var definition = !!typeMappings[type.name.value]
      ? typeMappings[type.name.value]
      : {
          $ref: `#/definitions/${type.name.value}`,
        };

    return {
      allOf: [definition],
      description: field.description?.value,
    };
  }
};

export const sdlToJsonSchema = (doc: string): JSONSchema6 | undefined => {
  try {
    if (doc) {
      var root = parse(doc);
      return buildJsonSchema(root);
    }
  } catch (e) {}
};
export const buildJsonSchema = (doc: DocumentNode): JSONSchema6 => {
  const definitions: Record<string, JSONSchema6Definition> = doc.definitions
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
    title: node.name.value,
    description: node.description?.value,
    enum: node?.values?.map((v) => v.name.value),
  };
};

const createUnionTypeDefinition = (
  node: UnionTypeDefinitionNode
): JSONSchema6 => {
  return {
    title: node.name.value,
    description: node.description?.value,
    oneOf: node?.types
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
