import { message } from "antd";
import { Disposable, UseMutationConfig } from "react-relay";
import { MutationParameters } from "relay-runtime";
import { CommitErrors, reportError } from "./CommitErrors";

export const pipeCommitFn = <T extends MutationParameters>(
  commitFn: (config: UseMutationConfig<T>) => Disposable,
  configs: ((config: UseMutationConfig<T>) => Partial<UseMutationConfig<T>>)[]
): ((config: UseMutationConfig<T>) => Disposable) => {
  return (config) => {
    for (var c of configs) {
      config = { ...config, ...c(config) };
    }
    return commitFn(config);
  };
};

export const withErrorNotifications = <T extends MutationParameters>(
  errorSelector?: (result: T["response"]) => CommitErrors
): ((config: UseMutationConfig<T>) => Partial<UseMutationConfig<T>>) => {
  return (config: UseMutationConfig<T>) => {
    return {
      onError: (error) => {
        config?.onError?.(error);
        reportError(error);
      },
      onCompleted: (response, errors) => {
        config?.onCompleted?.(response, errors);
        reportError(errors);
        if (errorSelector) {
          reportError(errorSelector(response));
        }
      },
    };
  };
};

export const withSuccessMessage = <T extends MutationParameters, TOther>(
  selector: (result: T["response"]) => TOther,
  successMessage: string = "Action Completed"
): ((config: UseMutationConfig<T>) => Partial<UseMutationConfig<T>>) => {
  return withOnSuccess(selector, () => message.success(successMessage));
};
export const withOnSuccess = <T extends MutationParameters, TOther>(
  selector: (result: T["response"]) => TOther,
  onSuccess: (response: NonNullable<TOther>) => void
): ((config: UseMutationConfig<T>) => Partial<UseMutationConfig<T>>) => {
  return withOnCompleted((response, errors) => {
    if (
      (errors?.length ?? 0) === 0 &&
      selector(response) !== null &&
      selector(response) !== undefined
    ) {
      onSuccess(selector(response) as any);
    }
  });
};

export const withOnCompleted = <T extends MutationParameters>(
  onCompleted: UseMutationConfig<T>["onCompleted"]
): ((config: UseMutationConfig<T>) => Partial<UseMutationConfig<T>>) => {
  return (config: UseMutationConfig<T>) => {
    return {
      onCompleted: (...args) => {
        config?.onCompleted?.(...args);
        onCompleted?.(...args);
      },
    };
  };
};
