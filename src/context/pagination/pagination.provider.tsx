import { useEffect, useState, type ReactNode } from "react";

import { PaginationContext } from "./pagination.context";

import { INITIAL_LIMIT, INITIAL_PAGE } from "../../constants";

export function PaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(INITIAL_LIMIT);

  useEffect(() => {
    setPage(INITIAL_PAGE);
  }, [limit]);

  const value = { page, setPage, limit, setLimit };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
}
