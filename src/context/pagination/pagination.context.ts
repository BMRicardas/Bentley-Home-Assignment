import { createContext } from "react";

type PaginationContextValue = {
  page: number;
  setPage: (page: number | ((page: number) => number)) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

export const PaginationContext = createContext<
  PaginationContextValue | undefined
>(undefined);
