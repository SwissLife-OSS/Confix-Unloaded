
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
      expanded: false,
      arrayListCount: 1
    };
  },
  methods: {
    changed: function (e) {
      this.inputValue = e;
    },
    onExpandCardClick: function () {
      this.expanded = !this.expanded;
    },
    onAddArrayItem: function(){
      this.arrayListCount++;
      console.log('ADD');
    }
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
    } else if (this.item.type === "object" || this.item.type === "arrayItem") {

      const expandIcon = <VIcon onclick={this.onExpandCardClick}> {this.expanded ? "mdi-chevron-up": "mdi-chevron-down"} </VIcon>

      let toolbar = (<VToolbar height={30} elevation={0} color="grey lighten-3">
            {this.item.name}
            <VSpacer></VSpacer>
            {expandIcon}
          </VToolbar>)

      if ( this.item.type === "arrayItem"){
              toolbar = (<VToolbar height={30} elevation={0} color="grey lighten-3">
              Item {this.item.index}
            <VSpacer></VSpacer>
            <VIcon>mdi-trash-can-outline</VIcon>
                        {expandIcon}
          </VToolbar>)
      }

      return (
        <VCard class="ml-2">
          {toolbar}
          {this.expanded && (
            <VCardText>
              {this.item.items.map((item) => {
                return <value-editor item={item}> </value-editor>;
              })}
            </VCardText>
          )}
        </VCard>
      );
      } else if (this.item.type === "array") {

        const arrayItems = [];
        for (let i = 0; i < this.arrayListCount; i++) {

          arrayItems.push({
            type: "arrayItem",
            name: this.item.name,
            index: i,
            items: this.item.items
          });
        } 

return(
        <VCard class="mt-4">
          <VToolbar height={30} elevation={0} color="grey lighten-1">
            {this.item.name}
            <VSpacer></VSpacer>
            <VIcon onclick={this.onExpandCardClick}>{this.expanded ? "mdi-chevron-up": "mdi-chevron-down"}</VIcon>
            <VIcon onclick={this.onAddArrayItem}>mdi-plus</VIcon>
          </VToolbar>

          {this.expanded && (
            <VCardText>
              {arrayItems.map((item) => {
                return <value-editor item={item}> </value-editor>;
              })}
            </VCardText>
          )}
        </VCard>
)

      } else if ( this.item.type === "number"){

return(

        <VTextField
          dense
          type="number"
          on-input={this.changed}
          value={this.item.value}
          label={this.item.name}
          append-icon="mdi-dots-horizontal"
        ></VTextField>
)
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
