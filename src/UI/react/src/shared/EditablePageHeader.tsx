import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Input, Button } from "antd";
import React, { useCallback, useState } from "react";
import { EditIcon } from "../icons/icons";
import { useStringEventHanlder } from "./useEventListener";
import { useToggle } from "./useToggle";

export const EditablePageHeader: React.FC<{
  value: string;
  onSave: (val: string) => void;
  loading?: boolean;
}> = ({ children, value: valueProps, onSave, loading = false }) => {
  const [isEdit, , enable, disable] = useToggle();
  const [value, setValue] = useState(valueProps);
  const handleValueChange = useStringEventHanlder(setValue);
  const handleSubmit = useCallback(() => {
    onSave(value);
    disable();
  }, [value, onSave, disable]);

  if (isEdit) {
    return (
      <Wrapper>
        <HeaderButton type="primary" onClick={handleSubmit} loading={loading}>
          Save
        </HeaderButton>
        <Title>
          <Input
            name="value"
            value={value}
            onBlur={disable}
            onChange={handleValueChange}
          ></Input>
        </Title>
        {children}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Title>
        <h2>
          {value}
          <HeaderButton
            type="text"
            css={css`
              display: inline-block;
            `}
            onClick={enable}
            icon={<EditIcon />}
          ></HeaderButton>
        </h2>
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
`;

export const HeaderButton = styled(Button)`
  flex: 0;
`;
