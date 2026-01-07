import type { leavesColumnRow } from "./leaves/leavesType";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    openDetail: (row: TData) => void;
  }
}
