import * as yup from 'yup';

export const variableSchema = yup.object({
  name: yup.string().required('Name is required.'),
  isSecret: yup.bool().required('Is secret is required.'),
  namespace: yup.string(),
  defaultValue: yup.string(),
});
