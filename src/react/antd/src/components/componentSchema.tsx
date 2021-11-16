import * as yup from "yup";

export const componentSchema = yup.object({
  name: yup.string().required("Name is required."),
  schema: yup.string().required("Namespace is required."),
});
