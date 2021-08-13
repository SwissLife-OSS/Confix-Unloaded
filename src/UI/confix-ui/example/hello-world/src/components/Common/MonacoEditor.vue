<template>
  <div></div>
</template>
<script lang="ts">
//Copied from https://github.com/egoist/vue-monaco
import Vue, { CreateElement } from "vue";
import m, { editor as MonacoEditor } from "monaco-editor";
import assign from "nano-assign";
import { maybeNull } from "../../helpers/state";

type Monaco = typeof m;

function isDiffEditor(
  editor?: MonacoEditor.IEditor | null
): editor is MonacoEditor.IDiffEditor {
  return editor?.getEditorType() == MonacoEditor.EditorType.IDiffEditor;
}

function isCodeEditor(
  editor?: MonacoEditor.IEditor | null
): editor is MonacoEditor.ICodeEditor {
  return editor?.getEditorType() == MonacoEditor.EditorType.ICodeEditor;
}

export default Vue.extend({
  name: "MonacoEditor",
  props: {
    original: String,
    value: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "vs",
    },
    language: String,
    options: Object,
    amdRequire: {
      type: Function,
    },
    diffEditor: {
      type: Boolean,
      default: false,
    },
  },

  model: {
    event: "change",
  },

  data: () => ({
    monaco: maybeNull<Monaco>(),
    editor: maybeNull<MonacoEditor.IEditor>(),
  }),

  watch: {
    options: {
      deep: true,
      handler(options: MonacoEditor.IEditorOptions) {
        if (this.editor) {
          const editor = this.getModifiedEditor();
          editor?.updateOptions(options);
        }
      },
    },

    value(newValue: string) {
      const editor = this.getOriginalEditor();
      if (editor) {
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue);
        }
      }
    },

    original(newValue: string) {
      const editor = this.getOriginalEditor();
      if (editor) {
        if (newValue !== editor.getValue()) {
          editor.setValue(newValue);
        }
      }
    },

    language(newVal: string) {
      const editor = this.getOriginalEditor();
      if (editor && this.monaco) {
        const model = editor.getModel();
        if (model) {
          this.monaco.setModelLanguage(model, newVal);
        }
      }
    },

    theme(newVal: string) {
      if (this.editor) {
        this.monaco?.editor.setTheme(newVal);
      }
    },
  },

  mounted() {
    this.monaco = require("monaco-editor");
    this.$nextTick(() => {
      if (this.monaco) {
        this.initMonaco(this.monaco);
      }
    });
  },

  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    this.editor && this.editor.dispose();
  },

  methods: {
    initMonaco(monaco: Monaco) {
      this.$emit("editorWillMount", this.monaco);

      const options = assign(
        {
          value: this.value,
          theme: this.theme,
          language: this.language,
        },
        this.options
      );

      if (this.diffEditor && this.original) {
        this.editor = monaco.editor.createDiffEditor(
          this.$el as HTMLElement,
          options
        );
        const originalModel = monaco.editor.createModel(
          this.original,
          this.language
        );
        const modifiedModel = monaco.editor.createModel(
          this.value,
          this.language
        );
        this.editor.setModel({
          original: originalModel,
          modified: modifiedModel,
        });
      } else {
        this.editor = monaco.editor.create(this.$el as HTMLElement, options);
      }

      // @event `change`
      const editor = this.getOriginalEditor();
      editor?.onDidChangeModelContent((event) => {
        const value = editor.getValue();
        if (this.value !== value) {
          this.$emit("change", value, event);
        }
      });

      this.$emit("editorDidMount", this.editor);
    },

    getModifiedEditor(): MonacoEditor.IEditor | null {
      if (!this.editor) {
        return null;
      }
      if (isDiffEditor(this.editor)) {
        return this.editor.getModifiedEditor();
      }
      return this.editor;
    },

    getOriginalEditor(): MonacoEditor.ICodeEditor | null {
      if (isDiffEditor(this.editor)) {
        return this.editor.getOriginalEditor();
      }
      if (isCodeEditor(this.editor)) {
        return this.editor;
      }
      return null;
    },

    focus() {
      this.editor?.focus();
    },
  },

  render(h: CreateElement) {
    return h("div");
  },
});
</script>
