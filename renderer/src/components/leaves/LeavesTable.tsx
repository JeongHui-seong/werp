import type { leavesColumnProps, leavesColumnRef } from "../../types/leaves/leavesType";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle } from "react";
import { leavesColumn } from "./LeavesColumn";
import { useCsvExport } from "../../hooks/table/useCsvExport";
import { TableUI } from "../table/tableUI";
import type { leavesColumnRow } from "../../types/leaves/leavesType";

export const LeavesTable = forwardRef<leavesColumnRef, leavesColumnProps>(({ recordData, filename }, ref) => {
    const table = useReactTable<leavesColumnRow>({
        data: recordData ?? [],
        columns: leavesColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
    });

    const handleExportToCsv = useCsvExport(table, filename);

    useImperativeHandle(ref, () => ({
        exportToCsv: handleExportToCsv,
    }));


    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <TableUI table={table} />
        </div>
    )
})