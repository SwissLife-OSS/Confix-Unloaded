import styled from "@emotion/styled";
import { Button } from "antd";
import React from "react";
export const SectionHeader: React.FC<{
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onAdd?: () => void;
  onSave?: () => void;
  children?: React.ReactElement;
}> = ({ title, onSave, onAdd, loading, disabled }) => {
  return (
    <Wrapper>
      <Title>{title && <h2>{title}</h2>}</Title>
      {onAdd && (
        <HeaderButton
          type="primary"
          onClick={onAdd}
          disabled={disabled}
          loading={loading}
        >
          Add
        </HeaderButton>
      )}
      {onSave && (
        <HeaderButton
          type="primary"
          onClick={onSave}
          disabled={disabled}
          loading={loading}
        >
          Save
        </HeaderButton>
      )}
    </Wrapper>
  );
};

const Title = styled("div")`
  flex: 1;
`;

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const HeaderButton = styled(Button)`
  flex: 0;
  margin-left: 10px;
`;
