import { useMemo } from "react";
import { useLocation } from "react-router";

export const useSearchQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
