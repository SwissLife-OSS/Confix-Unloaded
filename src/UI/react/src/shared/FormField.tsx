import { ClassNames, css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";
import { Checkbox, Input, InputProps, Row, Select } from "antd";
import React, { useCallback } from "react";
import { Colors } from "./colors";
import { SchemaEditor, useSchemaEditorRef } from "./editor/SchemaEditor";
import { ExtractProps } from "./ExtractProps";
import { UseFormik } from "./UseFormik";
import { useHandler } from "./useHandler";

export const FormActions = styled(Row)`
  padding: 0px 0px 5px 0px;
`;

export const ReadOnlyFormField: React.FC<{
  value: string;
  label: string;
}> = ({ value, label }) => (
  <Field name={label} label={label}>
    <Input value={value} disabled />
  </Field>
);

const Label = styled.label<{ isError?: boolean }>`
  color: ${(props) =>
    props.isError ? Colors.error : Colors.text.secondaryText};
`;

export const Field: React.FC<{
  name?: string;
  label: string;
  isError?: boolean;
  className?: string;
}> = ({ className, name, label, isError = false, children }) => (
  <Row
    css={[
      css`
        padding: 0px 0px 5px 0px;
        flex: 1;
      `,
    ]}
    className={className}
  >
    <Label htmlFor={name ?? label} title={label} isError={isError}>
      {label}
    </Label>
    {children}
  </Row>
);

export const FieldInput: React.FC<
  {
    name?: string;
    label: string;
    isError?: boolean;
  } & InputProps
> = ({ name, label, isError = false, ...inputProps }) => (
  <Field name={name} label={label} isError={isError}>
    <Input name={name ?? label} {...inputProps} />
  </Field>
);

export const FieldInputGroup: React.FC<
  {
    name?: string;
    label: string;
    isError?: boolean;
    compact?: boolean;
  } & InputProps
> = ({ name, label, isError = false, compact, children, ...inputProps }) => (
  <Field name={name} label={label} isError={isError}>
    <Input.Group
      compact={compact}
      css={css`
        display: flex;
        > * {
          flex: 0;
        }
      `}
    >
      <Input
        name={name ?? label}
        {...inputProps}
        style={{
          flex: "1",
        }}
      />
      {children}
    </Input.Group>
  </Field>
);

export function FormField<TValues>(props: {
  form: UseFormik<TValues>;
  field: keyof UseFormik<TValues>["values"];
  label: string;
}): React.ReactElement {
  const { form, field, label } = props;
  return (
    <Field
      name={String(field)}
      label={label}
      isError={(form.touched[field] && Boolean(form.errors[field])) || false}
    >
      <Input
        id={String(field)}
        name={String(field)}
        value={
          form.values[field] === null || form.values[field] === undefined
            ? undefined
            : String(form.values[field])
        }
        onChange={form.handleChange}
      />
    </Field>
  );
}

export function FormEditor<TValues>(props: {
  form: UseFormik<TValues>;
  field: keyof UseFormik<TValues>["values"];
  label: string;
}): React.ReactElement {
  const { form, field, label } = props;
  const editor = useSchemaEditorRef();
  const handleChange = useHandler(
    SchemaEditor,
    "onChange",
    (value: string | undefined) => {
      form.setFieldValue(String(field), value);
    },
    [form, field]
  );
  return (
    <Field
      css={css`
        height: 300px;
        display: flex;
        flex-direction: column;
      `}
      name={String(field)}
      label={label}
      isError={(form.touched[field] && Boolean(form.errors[field])) || false}
    >
      <div
        css={css`
          flex-grow: 1;
          display: flex;
        `}
      >
        <SchemaEditor
          schema={String(form.values[field])}
          configuration={editor}
          onChange={handleChange}
        />
      </div>
    </Field>
  );
}

export function FormCheckbox<TValues>(props: {
  form: UseFormik<TValues>;
  field: keyof UseFormik<TValues>["values"];
  label: string;
}): React.ReactElement {
  const { form, field, label } = props;
  return (
    <Field
      name={String(field)}
      label={label}
      isError={(form.touched[field] && Boolean(form.errors[field])) || false}
    >
      <Checkbox
        id={String(field)}
        name={String(field)}
        checked={Boolean(form.values[field])}
        onChange={form.handleChange}
      />
    </Field>
  );
}

export function TagSelectField<TValues>(props: {
  form: UseFormik<TValues>;
  field: keyof UseFormik<TValues>["values"];
  label: string;
}): React.ReactElement {
  const { form, field, label } = props;
  const onChange = useCallback(
    (value: string[], option: any) => {
      form.setFieldValue(String(field), value);
    },
    [field, form]
  );
  return (
    <Field
      name={String(field)}
      label={label}
      isError={(form.touched[field] && Boolean(form.errors[field])) || false}
    >
      <Select mode="tags" style={{ width: "100%" }} onChange={onChange} />
    </Field>
  );
}
