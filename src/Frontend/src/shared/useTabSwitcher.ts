import { useCallback } from "react";
import { useLocation } from "react-router";
import { useParams, useNavigate } from "react-router-dom";

export const useTabSwitcher = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToTab = useCallback(
    (tab: string) => {
      navigate(
        location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) +
          tab
      );
    },
    [location, navigate]
  );
  return { tab, navigateToTab };
};
