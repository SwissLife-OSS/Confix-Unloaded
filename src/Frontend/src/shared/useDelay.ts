import { useEffect } from "react";

export const useDelay = (cb: () => void, delay: number) => {
  useEffect(() => {
    (async () => {
      await new Promise((x) => setTimeout(x, delay));
      cb();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
