<template>
  <div></div>
</template>
<script lang="ts">
//Copied from https://github.com/egoist/vue-monaco
import { h } from "vue";
import { defineComponent } from "@vue/runtime-core";
import monaco from "monaco-editor";
import assign from "nano-assign";
import { maybeNull } from "../../helpers/state";

type MonacoImport = typeof monaco;

function isDiffEditor(
  editor?: monaco.editor.IEditor | null
): editor is monaco.editor.IDiffEditor {
  return editor?.getEditorType() == monaco.editor.EditorType.IDiffEditor;
}

function isCodeEditor(
  editor?: monaco.editor.IEditor | null
): editor is monaco.editor.ICodeEditor {
  return editor?.getEditorType() == monaco.editor.EditorType.ICodeEditor;
}

export default defineComponent({
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
    monaco: maybeNull<MonacoImport>(),
    editor: maybeNull<monaco.editor.IEditor>(),
  }),

  watch: {
    options: {
      deep: true,
      handler(options: monaco.editor.IEditorOptions) {
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
          this.monaco.editor.setModelLanguage(model, newVal);
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
    this.monaco = monaco;
    this.$nextTick(() => {
      this.initMonaco(monaco);
    });
  },

  beforeUnmount() {
    this.editor && this.editor.dispose();
  },

  methods: {
    initMonaco(monaco: MonacoImport) {
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
        this.editor = monaco.editor.createDiffEditor(this.$el, options);
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
        this.editor = monaco.editor.create(this.$el, options);
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

    getModifiedEditor(): monaco.editor.IEditor | null {
      if (!this.editor) {
        return null;
      }
      if (isDiffEditor(this.editor)) {
        return this.editor.getModifiedEditor();
      }
      return this.editor;
    },

    getOriginalEditor(): monaco.editor.ICodeEditor | null {
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

  render() {
    return h("div");
  },
});
</script>
