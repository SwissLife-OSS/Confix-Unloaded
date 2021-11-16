import { Collapse, notification } from "antd";
import { PayloadError } from "relay-runtime";

export type CommitErrors =
  | Error
  | PayloadError[]
  | readonly { readonly message?: String | null | undefined }[]
  | undefined
  | null;

export const reportError = (error: CommitErrors) => {
  if (error instanceof Error) {
    notification.error({
      message: "There was a fatal error",
      description: (
        <Collapse ghost>
          <Collapse.Panel header="See details" key="1">
            {JSON.stringify(error)}
          </Collapse.Panel>
        </Collapse>
      ),
    });
  } else if (Array.isArray(error)) {
    for (var err of error) {
      if (err.message) {
        notification.error({
          message: "There was a error in your mutation",
          description: (
            <Collapse ghost>
              <Collapse.Panel header="See details" key="1">
                {err.message}
              </Collapse.Panel>
            </Collapse>
          ),
        });
      }
    }
  }
};
