import {Button, List} from 'antd';

import {ColorTag} from '../../shared/ColorTag';
import {VariableValueList$key} from '@generated/VariableValueList.graphql';
import {graphql} from 'babel-plugin-relay/macro';
import {groupBy} from '../../shared/groupBy';
import {useFragment} from 'react-relay';
import {useMemo} from 'react';

export const VariableValueList: React.FC<{
  data: VariableValueList$key;
  onEdit: (id: string, name: string) => void;
}> = ({data, onEdit}) => {
  const values = useFragment<VariableValueList$key>(
    graphql`
      fragment VariableValueList on VariableValue @relay(plural: true) {
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
    `,
    data,
  );

  const grouped = useMemo(
    () =>
      groupBy(values?.map((x) => ({...x})) ?? [], (x) => x.variable?.id ?? ''),
    [values],
  );

  return (
    <List>
      {Object.keys(grouped).map((x) => {
        const variable = grouped[x][0].variable;
        const tags = grouped[x]
          .map((x) => x.environment?.name)
          .filter((x) => !!x)
          .map((x) => <ColorTag value={x ?? '-'}>{x}</ColorTag>);

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
              title={variable?.name ?? 'Unkonw'}
              description={tags}
            />
          </List.Item>
        );
      })}
    </List>
  );
};
