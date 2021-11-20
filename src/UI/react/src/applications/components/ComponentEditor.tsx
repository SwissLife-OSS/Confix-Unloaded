import styled from "@emotion/styled";
import { Col, Row } from "antd";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Colors } from "../../shared/colors";
import React, { useCallback } from "react";

const options = {
  glyphMargin: false,
  folding: false,
  lineNumbers: "off",
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0,
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line",
  automaticLayout: true,
  minimap: "off",
};
export const ComponentEditor: React.FC<{
  onValuesChanged: (values?: Record<string, any>) => void;
  values: string;
  schema: string;
}> = ({ values, schema, onValuesChanged }) => {
  const handleOnComponentValueChanges = useCallback(
    (value: string | undefined) => {
      try {
        if (!value) {
          onValuesChanged(undefined);
        } else {
          onValuesChanged(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
        onValuesChanged(undefined);
      }
    },
    [onValuesChanged]
  );
  return (
    <Wrapper>
      <div>
        <Header>Values</Header>
        <Editor
          value={values}
          options={options}
          height="auto"
          onChange={handleOnComponentValueChanges}
          defaultLanguage="json"
        ></Editor>
      </div>
      <div>
        <Header>Schema</Header>
        <Editor
          height="auto"
          options={options}
          value={schema}
          language="graphql"
        ></Editor>
      </div>
    </Wrapper>
  );
};

const Header = styled("h3")`
  flex: 0;
  text-align: center;
`;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 20px;
  > div {
    border: 1px solid ${Colors.gray[3]};
    padding: 5px;

    flex: 1;
    flex-direction: column;
    display: flex;
    > section {
      flex: 1;
    }
  }
`;
