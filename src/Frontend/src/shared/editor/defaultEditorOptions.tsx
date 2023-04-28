import {editor} from 'monaco-editor';

export const defaultEditorOptions: editor.IStandaloneEditorConstructionOptions =
  {
    glyphMargin: false,
    folding: false,
    lineNumbers: 'off',
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    formatOnPaste: true,
    formatOnType: true,
    automaticLayout: true,
    minimap: {enabled: false},
  };
