import * as yup from "yup";

export const environmentSchema = yup.object({
  name: yup.string().required("Name is required."),
});
