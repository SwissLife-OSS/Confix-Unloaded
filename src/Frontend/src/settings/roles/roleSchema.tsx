import * as yup from 'yup';

export const roleSchema = yup.object({
  name: yup.string().required('Name is required.'),
});
