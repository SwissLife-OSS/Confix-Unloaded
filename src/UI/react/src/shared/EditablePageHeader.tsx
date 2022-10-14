import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Breadcrumb, BreadcrumbItemProps, Button } from "antd";
import React from "react";
import { EditIcon } from "../icons/icons";

const empty: any[] = [];
const noop = () => {};
export const EditableBreadcrumbHeader: React.FC<{
  breadcrumbs?: Array<{ text: string } & BreadcrumbItemProps>;
  title: string;
  onEdit?: () => void;
  isEditable?: boolean;
  loading?: boolean;
  children?: React.ReactElement[] | React.ReactElement;
}> = ({
  title,
  children,
  onEdit = noop,
  breadcrumbs = empty,
  isEditable = true,
}) => {
  return (
    <Wrapper>
      <Title>
        <Breadcrumb>
          {breadcrumbs.map(({ text, ...props }, i) => (
            <Breadcrumb.Item key={i} {...props}>
              {text}
            </Breadcrumb.Item>
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
    font-size: 16px;
  }
  .ant-breadcrumb > span:last-child {
    font-size: 18px;
  }
`;

export const HeaderButton = styled(Button)`
  flex: 0;
`;
