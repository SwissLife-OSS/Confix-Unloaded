import { FormikConfig, FormikValues, useFormik } from "formik";

class Wrapper<Values extends FormikValues = FormikValues> {
  // wrapped has no explicit return type so we can infer it
  wrapped(v: FormikConfig<Values>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFormik<Values>(v);
  }
}

export type UseFormik<Values extends FormikValues = FormikValues> = ReturnType<
  Wrapper<Values>["wrapped"]
>;
