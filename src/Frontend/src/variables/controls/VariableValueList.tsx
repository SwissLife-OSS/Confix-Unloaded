import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { List, Button } from "antd";
import { useMemo } from "react";
import { ColorTag } from "../../shared/ColorTag";
import { groupBy } from "../../shared/groupBy";
import { VariableValueList_values$key } from "./__generated__/VariableValueList_values.graphql";

const variablueValues = graphql`
  fragment VariableValueList_values on VariableValue @relay(plural: true) {
    id
    environment {
      id
      name
    }
    variable {
      id
      name
    }
    value
  }
`;

export const VariableValueList: React.FC<{
  data: VariableValueList_values$key;
  onEdit: (id: string, name: string) => void;
}> = ({ data, onEdit }) => {
  const values = useFragment<VariableValueList_values$key>(
    variablueValues,
    data
  );

  const grouped = useMemo(
    () =>
      groupBy(
        values?.map((x) => ({ ...x })) ?? [],
        (x) => x.variable?.id ?? ""
      ),
    [values]
  );

  return (
    <List>
      {Object.keys(grouped).map((x) => {
        const variable = grouped[x][0].variable;
        const tags = grouped[x]
          .map((x) => x.environment?.name)
          .filter((x) => !!x)
          .map((x) => <ColorTag value={x ?? "-"}>{x}</ColorTag>);
        return (
          <List.Item
            actions={[
              <Button
                onClick={() => variable && onEdit(variable.id, variable.name)}
              >
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={variable?.name ?? "Unkonw"}
              description={tags}
            />
          </List.Item>
        );
      })}
    </List>
  );
};
