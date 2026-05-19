import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | HireMind AI` : "HireMind AI";
  }, [title]);
}
