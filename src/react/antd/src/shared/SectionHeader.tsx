import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import React from "react";
export const SectionHeader: React.FC<{
  title: string;
  onAdd: () => void;
}> = ({ title, onAdd }) => {
  return (
    <Wrapper>
      <Title>
        <h2>{title}</h2>
      </Title>
      <HeaderButton type="primary" onClick={onAdd}>
        Add
      </HeaderButton>
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
`;
