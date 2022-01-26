import * as React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Button, Card, Col, Descriptions, Empty, Row } from "antd";
import styled from "@emotion/styled";
import { generatePath, Link } from "react-router-dom";
import { EditIcon, DeleteIcon } from "../../icons/icons";
import { useToggle } from "../../shared/useToggle";
import { RemoveComponentFromApplicationPartDialog } from "../dialogs/RemoveComponentFromApplicationPartDialog";
import { EditApplicationPart_fragment } from "../__generated__/EditApplicationPart_fragment.graphql";
import { ApplicationPartComponents_component$key } from "./__generated__/ApplicationPartComponents_component.graphql";

export const ApplicationPartComponents: React.FC<{
  applicationId: string;
  components: EditApplicationPart_fragment["components"];
}> = ({ applicationId, components }) => {
  if (components.length === 0) {
    return <Empty description="No Application Parts"></Empty>;
  } else {
    return (
      <Row gutter={[16, 16]}>
        {(components.map((x) => ({ ...x })) ?? []).map((item) => (
          <Col span={8} key={item.definition.id}>
            <ApplicationPartComponentsDisplay
              applicationId={applicationId}
              part={item}
              componentPartId={item.id}
            />
          </Col>
        ))}
      </Row>
    );
  }
};
const applicationPartComponentFragment = graphql`
  fragment ApplicationPartComponents_component on ApplicationPartComponent {
    id
    definition {
      id
      name
      state
    }
  }
`;
const ApplicationPartComponentsDisplay: React.FC<{
  applicationId: string;
  componentPartId: string;
  part: ApplicationPartComponents_component$key;
}> = ({ part, applicationId, componentPartId }) => {
  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();
  const {
    id,
    definition: { name, state },
  } = useFragment(applicationPartComponentFragment, part);
  const linkToPart = generatePath(
    `../:applicationId/components/:componentId/edit`,
    {
      applicationId,
      componentId: id,
    }
  );
  return (
    <>
      <Card
        title={name}
        actions={[
          <Link to={linkToPart}>
            <EditIcon />
          </Link>,
        ]}
        extra={
          <Button icon={<DeleteIcon />} danger onClick={enableRemoveDialog} />
        }
      >
        <CardBody>
          <Descriptions>
            <Descriptions.Item label="name">{name}</Descriptions.Item>
            <Descriptions.Item label="state">{state}</Descriptions.Item>
          </Descriptions>
        </CardBody>
      </Card>
      <RemoveComponentFromApplicationPartDialog
        partComponentId={id}
        componentName={name}
        visible={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </>
  );
};
const CardBody = styled("div")`
  height: 200px;
  overflow-y: scroll;
`;
