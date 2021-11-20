import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Breadcrumb, BreadcrumbItemProps, Button } from "antd";
import React from "react";
import { EditIcon } from "../icons/icons";

export const EditableBreadcrumbHeader: React.FC<{
  breadcrumbs: Array<{ text: string } & BreadcrumbItemProps>;
  title: string;
  onEdit?: () => void;
  isEditable?: boolean;
  loading?: boolean;
}> = ({
  title,
  children,
  onEdit = () => {},
  breadcrumbs,
  isEditable = true,
}) => {
  return (
    <Wrapper>
      <Title>
        <Breadcrumb>
          {breadcrumbs.map(({ text, ...props }, i) => (
            <Breadcrumb.Item key={i} {...props}>{text}</Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>
            {title}
            {isEditable && (
              <HeaderButton
                type="text"
                css={css`
                  display: inline-block;
                `}
                onClick={onEdit}
                icon={<EditIcon />}
              ></HeaderButton>
            )}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Title>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const Title = styled("div")`
  flex: 1;
  .ant-breadcrumb {
    font-size: 14px;
  }
  .ant-breadcrumb > span:last-child {
    font-size: 18px;
  }
`;

export const HeaderButton = styled(Button)`
  flex: 0;
`;
