import type { leavesColumnProps, leavesColumnRef } from "../../types/leaves/leavesType";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import { leavesColumn } from "./LeavesColumn";
import { useCsvExport } from "../../hooks/table/useCsvExport";
import { TableUI } from "../table/tableUI";
import type { leavesColumnRow } from "../../types/leaves/leavesType";
import { LeaveDetailModal } from "./LeaveDetailModal";

export const LeavesTable = forwardRef<leavesColumnRef, leavesColumnProps>(({ recordData, filename }, ref) => {
    const [selectedRow, setSelectedRow] =
        useState<leavesColumnRow | null>(null);

    const openDetail = (row: leavesColumnRow) => {
        setSelectedRow(row);
    };

    const closeDetail = () => {
        setSelectedRow(null);
    };

    const table = useReactTable<leavesColumnRow>({
        data: recordData ?? [],
        columns: leavesColumn,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
        meta: {
            openDetail,
        }
    });

    const handleExportToCsv = useCsvExport(table, filename);

    useImperativeHandle(ref, () => ({
        exportToCsv: handleExportToCsv,
    }));


    return(
        <div className="mt-[20px] w-full overflow-auto text-base text-center">
            <LeaveDetailModal 
                open={!!selectedRow}
                data={selectedRow}
                onClose={closeDetail}
            />
            <TableUI table={table} />
        </div>
    )
})