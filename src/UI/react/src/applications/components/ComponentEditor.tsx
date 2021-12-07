import styled from "@emotion/styled";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Colors } from "../../shared/colors";
import React, { useCallback, useRef } from "react";
import { editor } from "monaco-editor";
import { css } from "@emotion/react";
import { Button } from "antd";
import {
  formatGraphQL,
  reportGraphQLFormatError,
} from "../../shared/formatGraphQL";
import { sdlToJsonSchema } from "./buildJsonSchema";
import { JSONSchema6 } from "json-schema";
import { useDelay } from "../../shared/useDelay";

const options: editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: false,
  folding: false,
  lineNumbers: "off",
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  formatOnPaste: true,
  formatOnType: true,
  automaticLayout: true,
  minimap: { enabled: false },
};

const readonlyOptions = { ...options, readOnly: true };

const noop = () => {};

const useValueEditorRef = () => {
  const ref = useRef<editor.IStandaloneCodeEditor | undefined>();
  const m = useMonaco();
  const monacoRef = useRef<typeof m>();
  monacoRef.current = m;
  const format = useCallback(() => {
    ref.current?.getAction("editor.action.formatDocument")?.run();
  }, []);
  const onMount = async (editor: editor.IStandaloneCodeEditor) => {
    ref.current = editor;
    await new Promise((x) => setTimeout(x, 500));
    format();
  };
  const setSchema = (jsonSchema: JSONSchema6) => {
    console.log(monacoRef.current?.languages);
    monacoRef.current?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: false,
      schemaValidation: "error",
      schemas: [
        {
          uri: "http://noop/schema.json",
          fileMatch: ["*"],
          schema: jsonSchema,
        },
      ],
    });
  };

  return { ref, onMount, format, setSchema };
};

const useSchemaEditorRef = () => {
  const ref = useRef<editor.IStandaloneCodeEditor | undefined>();
  const format = useCallback(() => {
    if (ref.current) {
      ref.current.setValue(
        formatGraphQL(ref.current.getValue(), reportGraphQLFormatError)
      );
    }
  }, []);
  const onMount = async (editor: editor.IStandaloneCodeEditor) => {
    ref.current = editor;
    format();
  };

  const getValue = () => ref.current?.getValue();

  return { ref, onMount, format, getValue };
};

export const ComponentEditor: React.FC<{
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
  const valueEditor = useValueEditorRef();
  const schemaEditor = useSchemaEditorRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSchema = useCallback(
    (value: string | undefined) => {
      const schema = value && sdlToJsonSchema(value, variables);
      schema && valueEditor.setSchema(schema);
    },
    [valueEditor, variables]
  );
  const handleSchemaChange = useCallback(
    (value: string | undefined) => {
      onSchemaChange(value);
      updateSchema(value);
    },
    [onSchemaChange, updateSchema]
  );
  useDelay(() => {
    updateSchema(schemaEditor.getValue());
  }, 1000);
  const handleComponentValueChange = useCallback(
    (value: string | undefined) => {
      try {
        if (!value) {
          onValuesChanged(undefined);
        } else {
          onValuesChanged(JSON.parse(value));
        }
      } catch (e) {
        onValuesChanged(undefined);
      }
    },
    [onValuesChanged]
  );
  return (
    <Wrapper>
      <div>
        <Header
          title={"Values"}
          actions={[<Button onClick={valueEditor.format}>Format</Button>]}
        />
        <Editor
          value={values}
          onMount={valueEditor.onMount}
          options={options}
          height="auto"
          onChange={handleComponentValueChange}
          defaultLanguage="json"
        ></Editor>
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
        <Editor
          height="auto"
          onMount={schemaEditor.onMount}
          options={editSchema ? options : readonlyOptions}
          value={schema}
          onChange={handleSchemaChange}
          language="graphql"
        ></Editor>
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
