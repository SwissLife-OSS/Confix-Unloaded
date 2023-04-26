import {css} from '@emotion/react';
import Editor from '@monaco-editor/react';
import {editor} from 'monaco-editor';
import {useCallback, useRef} from 'react';
import {formatGraphQL, reportGraphQLFormatError} from '../formatGraphQL';
import {noop} from '../noop';
import {defaultEditorOptions} from './defaultEditorOptions';

export type SchemaEditorConfiguration = ReturnType<typeof useSchemaEditorRef>;

const readonlyOptions = {...defaultEditorOptions, readOnly: true};

export const useSchemaEditorRef = () => {
  const ref = useRef<editor.IStandaloneCodeEditor | undefined>();
  const format = useCallback(() => {
    if (ref.current) {
      ref.current.setValue(
        formatGraphQL(ref.current.getValue(), reportGraphQLFormatError),
      );
    }
  }, []);
  const onMount = async (editor: editor.IStandaloneCodeEditor) => {
    ref.current = editor;
    format();
  };

  const getValue = () => ref.current?.getValue();

  return {ref, onMount, format, getValue};
};

export const SchemaEditor: React.FC<{
  configuration: SchemaEditorConfiguration;
  schema?: string;
  readonly?: boolean;
  onChange?: (value: string | undefined) => void;
}> = ({
  configuration: {onMount},
  schema,
  readonly = false,
  onChange = noop,
}) => {
  return (
    <Editor
      css={css`
        flex-grow: 1;
      `}
      height="auto"
      onMount={onMount}
      options={readonly ? readonlyOptions : defaultEditorOptions}
      value={schema}
      onChange={onChange}
      language="graphql"
    />
  );
};
