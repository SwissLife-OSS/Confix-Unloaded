import React from "react";
import { Tag, TagProps } from "antd";
import { hashCode } from "./hashCode";
import styled from "@emotion/styled";

const colors = [
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];

export const ColorTag: React.FC<{ value: string } & TagProps> = ({
  children,
  value,
  ...rest
}) => {
  return (
    <Tag {...rest} color={colors[hashCode(value) % colors.length]}>
      {children}
    </Tag>
  );
};

export const TagBar = styled("div")`
  display: flex;
  flex-direction: row;
`;
