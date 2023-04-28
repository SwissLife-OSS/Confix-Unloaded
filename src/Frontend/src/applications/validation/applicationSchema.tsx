import * as yup from 'yup';

export const applicationSchema = yup.object({
  name: yup.string().required('Name is required.'),
  namespace: yup.string().required('Namespace is required.'),
});
