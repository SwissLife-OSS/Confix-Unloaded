import { useEffect } from "react";

export const useDelay = (cb: () => void, delay: number) => {
  useEffect(() => {
    (async () => {
      await new Promise((x) => setTimeout(x, delay));
      cb();
    })();
  }, []);
};
