import type { attendanceRowProps, attendanceRow } from "../../types/attendance/attendanceRow";
import { useReactTable, getCoreRowModel, getSortedRowModel } from "@tanstack/react-table";
import type { monthlyAttendanceRef } from "../../types/attendance/attendanceRow";
import { forwardRef, useImperativeHandle } from "react";
import { attendanceColumn } from "./MonthlyAttendanceColumn";
import { useCsvExport } from "../../hooks/table/useCsvExport";
import { TableUI } from "../table/tableUI";

export const MonthlyAttendanceTable = forwardRef<monthlyAttendanceRef, attendanceRowProps>(({ recordData, filename }, ref) => {
    const table = useReactTable<attendanceRow>({
        data: recordData ?? [],
        columns: attendanceColumn,
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