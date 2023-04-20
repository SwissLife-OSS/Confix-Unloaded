import * as React from "react";

import { Button, Card, Col, Descriptions, Empty, Row } from "antd";
import { DeleteIcon, EditIcon } from "../../icons/icons";
import { Link, generatePath } from "react-router-dom";

import { ApplicationPartComponents$key } from "@generated/ApplicationPartComponents.graphql";
import { ApplicationPartComponents_ApplicationPartComponentsDisplay$key } from "@generated/ApplicationPartComponents_ApplicationPartComponentsDisplay.graphql";
import { RemoveComponentFromApplicationPartDialog } from "../dialogs/RemoveComponentFromApplicationPartDialog";
import { graphql } from "babel-plugin-relay/macro";
import styled from "@emotion/styled";
import { useFragment } from "react-relay";
import { useToggle } from "../../shared/useToggle";

export const ApplicationPartComponents: React.FC<{
  applicationId: string;
  fragmentRef: ApplicationPartComponents$key;
}> = ({ applicationId, fragmentRef }) => {
  const { components } = useFragment(
    graphql`
      fragment ApplicationPartComponents on ApplicationPart {
        components {
          id
          definition {
            id
          }
          ...ApplicationPartComponents_ApplicationPartComponentsDisplay
        }
      }
    `,
    fragmentRef
  );

  if (components.length === 0) {
    return <Empty description="No Application Parts"></Empty>;
  }

  return (
    <Row gutter={[16, 16]}>
      {(components.map((x) => ({ ...x })) ?? []).map((item) => (
        <Col span={8} key={item.definition?.id}>
          <ApplicationPartComponentsDisplay
            applicationId={applicationId}
            fragmentRef={item}
            componentPartId={item.id}
          />
        </Col>
      ))}
    </Row>
  );
};

const ApplicationPartComponentsDisplay: React.FC<{
  applicationId: string;
  componentPartId: string;
  fragmentRef: ApplicationPartComponents_ApplicationPartComponentsDisplay$key;
}> = ({ fragmentRef, applicationId }) => {
  const { id, definition } = useFragment(
    graphql`
      fragment ApplicationPartComponents_ApplicationPartComponentsDisplay on ApplicationPartComponent {
        id
        definition {
          id
          name
          state
        }
      }
    `,
    fragmentRef
  );

  const [isRemoveDialogShown, , enableRemoveDialog, disableRemoveDialog] =
    useToggle();

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
        title={definition?.name}
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
            <Descriptions.Item label="name">
              {definition?.name}
            </Descriptions.Item>
            <Descriptions.Item label="state">
              {definition?.state}
            </Descriptions.Item>
          </Descriptions>
        </CardBody>
      </Card>
      <RemoveComponentFromApplicationPartDialog
        partComponentId={id}
        componentName={definition?.name ?? ""}
        open={isRemoveDialogShown}
        onClose={disableRemoveDialog}
      />
    </>
  );
};

const CardBody = styled("div")`
  height: 200px;
  overflow-y: auto;
`;
