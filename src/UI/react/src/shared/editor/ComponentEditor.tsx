import Editor, { useMonaco } from "@monaco-editor/react";
import { JSONSchema6 } from "json-schema";
import { editor } from "monaco-editor";
import { useCallback, useRef } from "react";
import { defaultEditorOptions } from "./defaultEditorOptions";

export type ComponentValueEditorConfiguration = ReturnType<
  typeof useComponentValueEditorRef
>;

export const useComponentValueEditorRef = () => {
  const ref = useRef<editor.IStandaloneCodeEditor | undefined>();
  const m = useMonaco();

  const monacoRef = useRef<typeof m>();
  monacoRef.current = m;
  const format = useCallback(() => {
    ref.current?.getAction("editor.action.formatDocument")?.run();
  }, []);
  const onMount = async (editor: editor.IStandaloneCodeEditor) => {
    ref.current = editor;

    // we first try to format the json string. this way it does less flicker
    try {
      ref.current.setValue(
        JSON.stringify(JSON.parse(ref.current.getValue()), undefined, 4)
      );
    } catch {}

    await new Promise((x) => setTimeout(x, 100));
    format();
  };
  const setSchema = (jsonSchema: JSONSchema6) => {
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

export const ComponentValueEditor: React.FC<{
  configuration: ComponentValueEditorConfiguration;
  values: string;
  onChange: (value: string | undefined) => void;
}> = ({ configuration: { onMount }, values, onChange }) => {
  return (
    <Editor
      value={values}
      onMount={onMount}
      options={defaultEditorOptions}
      height="auto"
      onChange={onChange}
      defaultLanguage="json"
    />
  );
};
