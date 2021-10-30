import { FormControl, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { UseFormik } from "./UseFormik";

export function ReadOnlyFormField(props: TextFieldProps): React.ReactElement {
  const { ...rest } = props;
  return (
    <FormControl fullWidth>
      <TextField {...rest} disabled />
    </FormControl>
  );
}
export function FormField<TValues>(
  props: TextFieldProps & {
    form: UseFormik<TValues>;
    field: keyof UseFormik<TValues>["values"];
  }
): React.ReactElement {
  const { form, field, ...rest } = props;
  return (
    <FormControl fullWidth>
      <TextField
        {...rest}
        id={String(field)}
        name={String(field)}
        value={form.values[field]}
        onChange={form.handleChange}
        error={form.touched[field] && Boolean(form.errors[field])}
        helperText={form.touched[field] && form.errors[field]}
      />
    </FormControl>
  );
}
