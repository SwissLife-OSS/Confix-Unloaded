import { FormikConfig, useFormik } from "formik";
import { Disposable, UseMutationConfig } from "react-relay";
import { MutationParameters } from "relay-runtime";
import { pipeCommitFn } from "./pipeCommitFn";
import { UseFormik } from "./UseFormik";

export const useCommitForm = <TMutation extends MutationParameters, T>(
  commit: (config: UseMutationConfig<TMutation>) => Disposable,
  initialValues: T,
  variablesSelector: (values: T) => UseMutationConfig<TMutation>["variables"],
  config: {
    pipes: ((
      config: UseMutationConfig<TMutation>
    ) => Partial<UseMutationConfig<TMutation>>)[];
  } & Partial<FormikConfig<T>>
): UseFormik<T> => {
  let { pipes, enableReinitialize, ...rest } = config;
  return useFormik({
    ...rest,
    enableReinitialize:
      enableReinitialize === undefined ? true : enableReinitialize,
    initialValues,
    onSubmit: (input) => {
      var commitFn = pipeCommitFn(commit, config.pipes);
      commitFn({ variables: variablesSelector(input) });
    },
  });
};
