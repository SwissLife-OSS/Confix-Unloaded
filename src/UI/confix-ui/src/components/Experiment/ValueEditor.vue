
<script lang="jsx">
import {
  VTextField,
  VSwitch,
  VCard,
  VToolbar,
  VCardText,
  VSelect,
  VIcon,
  VSpacer,
} from "vuetify/lib";

export default {
  name: "value-editor",
  props: ["item"],
  created() {
    this.inputValue = this.item.value;
  },
  data() {
    return {
      inputValue: null,
      expanded: true,
    };
  },
  methods: {
    changed: function (e) {
      this.inputValue = e;
    },
    onExpandCardClick: function () {
      this.expanded = !this.expanded;
    },
  },
  render() {
    if (this.item.type === "bool") {
      return <VSwitch dense label={this.item.name}></VSwitch>;
    } else if (this.item.type === "enum") {
      return (
        <VSelect
          dense
          label={this.item.name}
          items={this.item.values}
        ></VSelect>
      );
    } else if (this.item.type === "object") {
      return (
        <VCard class="ml-2">
          <VToolbar height={30} elevation={0} color="grey lighten-3">
            {this.item.name}
            <VSpacer></VSpacer>
            <VIcon onclick={this.onExpandCardClick}>mdi-chevron-up</VIcon>
          </VToolbar>

          {this.expanded && (
            <VCardText>
              {this.item.items.map((item) => {
                return <value-editor item={item}> </value-editor>;
              })}
            </VCardText>
          )}
        </VCard>
      );
    } else {
      return (
        <VTextField
          dense
          on-input={this.changed}
          value={this.item.value}
          label={this.item.name}
          append-icon="mdi-dots-horizontal"
        ></VTextField>
      );
    }
  },
};
</script>
