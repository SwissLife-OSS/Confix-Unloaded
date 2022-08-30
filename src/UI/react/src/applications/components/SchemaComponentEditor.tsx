import styled from "@emotion/styled";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Colors } from "../../shared/colors";
import React, { useCallback, useRef } from "react";
import { editor } from "monaco-editor";
import { css } from "@emotion/react";
import { Button } from "antd";
import { sdlToJsonSchema } from "./buildJsonSchema";
import { JSONSchema6 } from "json-schema";
import { useDelay } from "../../shared/useDelay";
import { noop } from "../../shared/noop";
import {
  SchemaEditor,
  useSchemaEditorRef,
} from "../../shared/editor/SchemaEditor";
import {
  ComponentValueEditor,
  useComponentValueEditorRef,
} from "../../shared/editor/ComponentEditor";
import { useHandler } from "../../shared/useHandler";

export const SchemaComponentEditor: React.FC<{
  onValuesChanged?: (values?: Record<string, any>) => void;
  onSchemaChange?: (schema?: string) => void;
  values: string;
  schema: string;
  editSchema?: boolean;
  variables?: string[];
}> = ({
  values,
  schema,
  onValuesChanged = noop,
  onSchemaChange = noop,
  editSchema = false,
  variables = [],
}) => {
  const valueEditor = useComponentValueEditorRef();
  const schemaEditor = useSchemaEditorRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSchema = useCallback(
    (value: string | undefined) => {
      const schema = value && sdlToJsonSchema(value, variables);
      schema && valueEditor.setSchema(schema);
    },
    [valueEditor, variables]
  );

  const handleSchemaChange = useHandler<typeof SchemaEditor, "onChange">(
    (value: string | undefined) => {
      onSchemaChange(value);
      updateSchema(value);
    }
  );

  useDelay(() => {
    updateSchema(schemaEditor.getValue());
  }, 1000);

  const handleComponentValueChange = useHandler<
    typeof ComponentValueEditor,
    "onChange"
  >((value: string | undefined) => {
    try {
      if (!value) {
        onValuesChanged(undefined);
      } else {
        onValuesChanged(JSON.parse(value));
      }
    } catch (e) {
      onValuesChanged(undefined);
    }
  });

  return (
    <Wrapper>
      <div>
        <Header
          title={"Values"}
          actions={[<Button onClick={valueEditor.format}>Format</Button>]}
        />
        <ComponentValueEditor
          configuration={valueEditor}
          values={values}
          onChange={handleComponentValueChange}
        />
      </div>
      <div>
        <Header
          title={"Schema"}
          actions={
            editSchema
              ? [
                  <Button key="f" onClick={schemaEditor.format}>
                    Format
                  </Button>,
                ]
              : []
          }
        ></Header>
        <SchemaEditor
          configuration={schemaEditor}
          schema={schema}
          readonly={!editSchema}
          onChange={handleSchemaChange}
        />
      </div>
    </Wrapper>
  );
};

const Header: React.FC<{ title: string; actions?: React.ReactNode[] }> = ({
  title,
  actions,
}) => {
  return (
    <div
      css={css`
        flex: 0;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div></div>
      <div>
        <h3>{title}</h3>
      </div>
      <div>{actions}</div>
    </div>
  );
};

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  > div {
    border: 1px solid ${Colors.gray[3]};
    padding: 5px;
    flex: 1;
    flex-direction: column;
    display: flex;
    > section {
      flex: 1;
    }
  }
`;
